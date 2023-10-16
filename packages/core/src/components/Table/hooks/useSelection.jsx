import { Checkbox } from "ant-design-vue";
import { computed, ref } from 'vue';

export default function useSelection(
  rowSelection,
) {
  const rowSelectionRef = ref();
  
  const enableRowSelection = computed(() => {
    return !!rowSelection;
  });

  const transformColumns = (columnsRef) => {
    let cloneColumns = columnsRef.slice();

    if (!enableRowSelection.value) {
      return cloneColumns;
    }
    const selectionColumn = {
      id: 'selection',
      size: 32,
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        ></Checkbox>
      ),
      cell: ({ row }) => (
        <div>
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }

    return [selectionColumn, ...cloneColumns];
  }

  return [transformColumns, enableRowSelection, rowSelectionRef];
}