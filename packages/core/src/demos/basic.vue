<template>
  <Table :columns="columns" :data-source="data" />
</template>
<script lang="jsx">
import { defineComponent, reactive, ref } from "vue";
import { Tag, Space } from "ant-design-vue";
import Table from '../components/Table/Table.vue'

export default defineComponent({
  name: "Basic",
});
</script>
<script setup lang="jsx">

const columns = reactive([
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    customRender: ({ text }) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    customRender: ({ record: { tags } }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    dataIndex: 'action',
    customRender: ({ record }) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]);

const data = ref([
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
]);
</script>
