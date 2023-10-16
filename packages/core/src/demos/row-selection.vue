<template>
  <Checkbox v-model:checked="checked"></Checkbox>
  <Table :row-selection="rowSelection" :columns="columns" :data-source="data" />
</template>
<script>
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "RowSelection",
});
</script>
<script setup>
import Table from '../components/Table/Table.vue'
import {Checkbox } from "ant-design-vue";


const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park",
  },
];

const checked = ref(true);

const rowSelection = computed(() => {
  if (checked.value) {
    return {
      onChange: ([selectedRowKeys, selectedRows]) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name,
      }),
    };
  } else {
    return null;
  }
});
</script>
