import { getCoreRowModel, useVueTable } from "@tanstack/vue-table";

export default function useTable ({
  dataSource,
  columns,
}) {
  const table = useVueTable({
    get data () {
      return dataSource;
    },
    get columns () {
      return columns;
    },
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  })

  return table;
}