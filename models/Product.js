const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
