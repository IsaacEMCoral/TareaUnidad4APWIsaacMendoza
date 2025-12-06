<template>
  <nav class="navbar">
    <h1>MercApp</h1>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/products">Productos</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2c3e50;
  padding: 10px;
  color: white;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 15px;
}
.navbar a {
  color: white;
  text-decoration: none;
}
</style>
