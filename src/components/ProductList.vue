<template>
  <div>
    <h2>Lista de Productos</h2>
    <Alert v-if="error" :message="error" type="error" />
    <ProductForm @created="loadProducts" />
    <ul>
      <ProductItem
        v-for="p in products"
        :key="p._id"
        :product="p"
        @deleted="loadProducts"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import ProductItem from "./ProductItem.vue"
import ProductForm from "./ProductForm.vue"
import Alert from "./Alert.vue"

const products = ref([])
const error = ref("")
const api = import.meta.env.VITE_API_URL

const loadProducts = async () => {
  try {
    const res = await fetch(`${api}/products`)
    products.value = await res.json()
  } catch (err) {
    error.value = "Error cargando productos"
  }
}

onMounted(loadProducts)
</script>
