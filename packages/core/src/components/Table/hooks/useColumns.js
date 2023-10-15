export default function useColumns(originalColumns) {
  return originalColumns.map((col) => ({
    accessorKey: col.dataIndex,
    header: col.title,
    size: col.width,
    accessorFn: col.customHeaderCell,
    align: "left",
    ellipsis: col.ellipsis ?? false,
    tableBodyCellEditFieldProps: col.tableBodyCellEditFieldProps,
    cell: ({ cell, getValue }) => {
      return typeof col.customRender !== "undefined"
        ? col?.customRender({
            text: getValue(),
            record: cell.row.original,
            index: cell.row.index,
            column: col,
          })
        : getValue();
    },
  }));
}
