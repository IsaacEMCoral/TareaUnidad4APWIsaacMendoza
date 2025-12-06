<template>
  <div id="app">
    <Navbar />

    <main>
      <h1>MercApp Frontend</h1>

      <button @click="checkHealth">Probar conexión API</button>
      <pre>{{ health }}</pre>

      <ProductList />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue"
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import ProductList from "./components/ProductList.vue"

const health = ref(null)
const api = import.meta.env.VITE_API_URL

const checkHealth = async () => {
  const res = await fetch(`${api}/health`)
  health.value = await res.json()
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
main {
  padding: 20px;
}
button {
  margin: 10px 0;
  padding: 8px 12px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #2980b9;
}
</style>
