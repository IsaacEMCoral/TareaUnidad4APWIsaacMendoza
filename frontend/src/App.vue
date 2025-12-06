<template>
  <div>
    <h1>MercApp Frontend</h1>
    <button @click="checkHealth">Probar conexión API</button>
    <pre>{{ health }}</pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const health = ref(null)
const api = import.meta.env.VITE_API_URL

const checkHealth = async () => {
  const res = await fetch(`${api}/health`)
  health.value = await res.json()
}
</script>
