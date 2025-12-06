require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const http = require('http');
const { Server } = require('socket.io');
const expressLayouts = require('express-ejs-layouts');
const Message = require('./models/Message');

const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGODB_URI);

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(expressLayouts);      
  app.set('layout', 'layout');

  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
  }));

  app.use((req, res, next) => {
    if (req.session && req.session.userId) {
      res.locals.user = { username: req.session.username || 'Usuario', role: req.session.userRole || 'user' };
    } else {
      res.locals.user = null;
    }
    next();
  });

  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/products');
  const indexRoutes = require('./routes/index');

  app.use('/auth', authRoutes);
  app.use('/products', productRoutes);
  app.use('/', indexRoutes);

  io.on('connection', async (socket) => {
    console.log('Socket conectado', socket.id);

    const messages = await Message.find().sort({ createdAt: 1 }).limit(50);
    messages.forEach(m => {
      socket.emit('chatMessage', { user: m.user, text: m.text });
    });

    socket.on('chatMessage', async (data) => {
      const msg = new Message({ user: data.user || 'Anon', text: data.text });
      await msg.save();
      io.emit('chatMessage', { user: data.user || 'Admin', text: data.text });
    });
    socket.on('disconnect', () => console.log('Socket desconectado', socket.id));
  });

  server.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
})();
