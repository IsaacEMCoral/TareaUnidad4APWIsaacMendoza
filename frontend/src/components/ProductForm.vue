<template>
  <form @submit.prevent="addProduct" class="product-form">
    <input v-model="name" placeholder="Nombre" required />
    <input v-model="price" placeholder="Precio" type="number" required />
    <button type="submit">Agregar</button>
  </form>
</template>

<script setup>
import { ref } from "vue"
const emit = defineEmits(["created"])
const api = import.meta.env.VITE_API_URL

const name = ref("")
const price = ref("")

const addProduct = async () => {
  await fetch(`${api}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.value, price: price.value })
  })
  name.value = ""
  price.value = ""
  emit("created")
}
</script>

<style scoped>
.product-form {
  margin-bottom: 15px;
}
input {
  margin-right: 10px;
  padding: 5px;
}
button {
  background: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
