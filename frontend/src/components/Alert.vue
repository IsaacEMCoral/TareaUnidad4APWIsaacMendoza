<template>
   <div v-if="message" :class="['alert', type]">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
  type: { type: String, default: "info" }
})
</script>

<style scoped>
.alert {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  font-weight: bold;
}

.alert.info {
  background: #d9edf7;
  color: #31708f;
}

.alert.success {
  background: #d4edda;
  color: #155724;
}

.alert.error {
  background: #f8d7da;
  color: #721c24;
}
</style>
