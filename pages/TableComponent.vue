<!-- TableComponent.vue -->
<template>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('age')">Age</th>
          <!-- Add more columns as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedData" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <!-- Display more columns as needed -->
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: ['data'],
    data() {
      return {
        sortedData: [...this.data],
        sortKey: null,
        reverse: false,
      };
    },
    methods: {
      sortBy(key) {
        this.reverse = this.sortKey === key ? !this.reverse : false;
        this.sortKey = key;
  
        this.sortedData = this.sortData(this.data, key, this.reverse);
      },
      sortData(data, key, reverse) {
        const clonedData = [...data];
        return clonedData.sort((a, b) => {
          let comparison = 0;
  
          if (a[key] > b[key]) {
            comparison = 1;
          } else if (a[key] < b[key]) {
            comparison = -1;
          }
  
          return reverse ? -comparison : comparison;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styling as needed */
  </style>
  