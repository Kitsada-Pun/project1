<template>
    <div>
      <label for="fruit">เลือกผลไม้:</label>

      <select v-model="selectedFruit" @change="sortTable">
        <option v-for="fruit in fruits" :key="fruit">{{ fruit }}</option>
      </select>
  
      <table v-if="selectedFruit">

        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ผลไม้</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>{{ selectedFruit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFruit: '',
        fruits: ['มะม่วง', 'แอปเปิ้ล', 'กล้วย', 'ส้ม', 'ทุเรียน','1'],
      };
    },
    methods: {
      sortTable() {
        // ไม่จำเป็นต้องทำการ sorting ข้อมูลในกรณีนี้
        // คุณสามารถปรับปรุงเพิ่มเติมตามความต้องการ
      },
    },
  };
  </script>
  
  <style>
  /* สไตล์ CSS สามารถเพิ่มได้ตามต้องการ */
  </style>
  