<template>
  <div>
      <div v-if='total>0' style="color:rgb(135, 209, 15) " class="total-value">Balance: {{ total }}</div>
      <div v-else-if="total<0"  style="color:red " class="total-value">Balance: {{ total }}</div>
      <div v-else  class="total-value">Balance: {{ total }}</div>
  </div>
</template>

<script>
export default {
  name: "TotalBalance",
  props: {
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
}
</style>