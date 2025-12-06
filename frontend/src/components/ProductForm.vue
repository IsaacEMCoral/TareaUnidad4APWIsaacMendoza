<template>
  <form @submit.prevent="addProduct" class="product-form">
    <Alert v-if="alertMessage" :message="alertMessage" :type="alertType" />

    <input v-model="productId" placeholder="ID del producto" required />
    <input v-model="name" placeholder="Nombre" required />
    <textarea v-model="description" placeholder="Descripción"></textarea>

    <select v-model="category" required>
      <option disabled value="">Selecciona categoría</option>
      <option>Electronicos</option>
      <option>Mascotas</option>
      <option>Ropa</option>
      <option>Accesorios</option>
      <option>Hogar</option>
    </select>

    <input v-model="price" type="number" placeholder="Precio" required min="0" />
    <input v-model="stock" type="number" placeholder="Stock" required min="0" />

    <button type="submit">Agregar</button>
  </form>
</template>

<script setup>
import { ref } from "vue"
import Alert from "./Alert.vue"

const emit = defineEmits(["created"])
const api = import.meta.env.VITE_API_URL

const productId = ref("")
const name = ref("")
const description = ref("")
const category = ref("")
const price = ref("")
const stock = ref("")

const alertMessage = ref("")
const alertType = ref("info")

const addProduct = async () => {
  try {
    const res = await fetch(`${api}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: productId.value,
        name: name.value,
        description: description.value,
        category: category.value,
        price: price.value,
        stock: stock.value
      })
    })

    if (!res.ok) throw new Error("Error al crear producto")

    alertMessage.value = "Producto agregado correctamente"
    alertType.value = "success"

    // limpiar campos
    productId.value = ""
    name.value = ""
    description.value = ""
    category.value = ""
    price.value = ""
    stock.value = ""

    emit("created")
  } catch (err) {
    alertMessage.value = err.message
    alertType.value = "error"
  }
}
</script>

<style scoped>
.product-form {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
input, textarea, select {
  padding: 6px;
}
button {
  background: green;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
}
button:hover {
  background: darkgreen;
}
</style>
