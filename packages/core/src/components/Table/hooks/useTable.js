import { getCoreRowModel, useVueTable } from "@tanstack/vue-table";

export default function useTable({
  dataSource,
  columnsRef,
  enableRowSelectionRef,
  rowSelectionRef,
}) {
  const table = useVueTable({
    get data() {
      return dataSource;
    },
    get columns() {
      return columnsRef.value;
    },
    state: {
      get rowSelection() {
        return rowSelectionRef.value;
      },
    },
    onRowSelectionChange: (updaterOrValue) => {
      rowSelectionRef.value =
        typeof updaterOrValue === "function"
          ? updaterOrValue(rowSelectionRef.value)
          : updaterOrValue;
      console.log(rowSelectionRef.value);
    },
    enableRowSelection: enableRowSelectionRef.value,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return table;
}
