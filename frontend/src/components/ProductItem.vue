<template>
  <li class="product-item">
    {{ product.name }} - ${{ product.price }}
    <button @click="deleteProduct">Eliminar</button>
  </li>
</template>

<script setup>
const props = defineProps({ product: Object })
const emit = defineEmits(["deleted"])
const api = import.meta.env.VITE_API_URL

const deleteProduct = async () => {
  await fetch(`${api}/products/${props.product._id}`, { method: "DELETE" })
  emit("deleted")
}
</script>

<style scoped>
.product-item {
  margin: 5px 0;
}
button {
  margin-left: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
