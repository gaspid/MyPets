<template>
  <div id="app">
    <Form @submitForm="onFormSubmit" />
    <TotalBalance :total="totalBalance" />
    <BudgetList :list="list" @deleteItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import Form from "@/components/Form";

export default {
  name: "app",
  components: {
    BudgetList,
    TotalBalance,
    Form
  },
  data: () => ({
    list: [
       {
        type: "INCOME",
        value: 100,
        comment: "Some comment",
        id: 1
      },
       {
        type: "OUTCOME",
        value: -52,
        comment: "Some outcome comment",
        id: 2
      }
    ]
  }),
  computed: {
    totalBalance() {
      return Object.values(this.list).reduce(
        (acc, item) => acc + item.value,
        0
      );
    }
  },
  methods: {
    onDeleteItem(item) {
      console.log(item)
      this.list = this.list.filter(p => p.id!==item.id);
    },
    onFormSubmit(data) {
      const newObj = {
        ...data,
        id: Date.now()
      };

      this.list.push(newObj);
    }
  }
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
