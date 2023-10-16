<script lang="jsx">
import { defineComponent, ref, computed, unref, watch } from "vue";
import { FlexRender } from "@tanstack/vue-table";
import { array, bool, func, object, oneOfType, string } from "vue-types";
import { isUndefined } from "lodash-es";
import useColumns from "./hooks/useColumns";
import useVirtualizer from "./hooks/useVirtualizer";
import useTable from "./hooks/useTable";
import TableBodyCell from "./TableBodyCell";
import useSelection from './hooks/useSelection';

export default defineComponent({
  props: {
    columns: array(),
    dataSource: array(),
    tableLayout: string().def("auto"),
    scroll: object(),
    rowKey: oneOfType([string(), func()]),
    bordered: bool(),
    enableEditing: bool(),
    tableBodyCellEditFieldProps: object(),
    rowSelection: object(),
  },
  emits: ["change"],
  setup(props) {
    const mergedTableLayout = computed(() => {
      return props.columns.some((col) => col.fixed || col.ellipsis) ||
        !isUndefined(props.scroll?.x) ||
        !isUndefined(props.scroll?.y)
        ? "fixed"
        : props.tableLayout;
    });
    const tableContainerRef = ref();
    const columnsRef = ref([]);

    const hasScollYbar = computed(() => !isUndefined(props.scroll?.y));
    
    const [transformSelectionColumns, enableRowSelectionRef, rowSelectionRef] = useSelection(props.rowSelection);

    columnsRef.value = useColumns(props.columns);

    watch(() => props.dataSource, () => {
      columnsRef.value = transformSelectionColumns(columnsRef.value);
    }, { immediate: true })

    const table = useTable({ dataSource: props.dataSource, columnsRef, rowSelectionRef, enableRowSelectionRef });

    const [virtualizer, visibleRowRef] = useVirtualizer({
      dataSource: props.dataSource,
      scrollElement: tableContainerRef,
      table,
    });

    return () => {
      const virtualRows = virtualizer.value.getVirtualItems();
      const totalSize = virtualizer.value.getTotalSize();

      const paddingTop =
        virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
      const paddingBottom =
        virtualRows.length > 0
          ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
          : 0;
      const headerGroups = table.getHeaderGroups();

      return (
        <div
          class={{
            "virtual-table--bordered": props.bordered,
          }}
        >
          <div
            ref={tableContainerRef}
            style={
              hasScollYbar.value && {
                overflow: "auto",
                height: `${props.scroll.y}px`,
              }
            }
          >
            <table
              class="virtual-table"
              style={{ "table-layout": unref(mergedTableLayout) }}
            >
              <thead class="virtual-table-head">
                {headerGroups.map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          class={{
                            "virtual-table-cell": true,
                            "virutal-table-selection-cell":
                              header.id === "selection",
                          }}
                          key={header.id}
                          colspan={header.colSpan}
                          style={{
                            width: isUndefined(header.column.columnDef.size)
                              ? undefined
                              : `${header.getSize()}px`,
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                class: {
                                  "inline-flex": header.id === "selection",
                                  "flex-col": header.id === "selection",
                                  truncate: header.column.columnDef.ellipsis,
                                },
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              <FlexRender
                                render={header.column.columnDef.header}
                                props={header.getContext()}
                              />
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody class="virtual-table-body">
                {paddingTop > 0 && (
                  <tr>
                    <td style={{ height: `${paddingTop}px` }} />
                  </tr>
                )}
                {virtualRows.map((virtualRow) => {
                  const row = visibleRowRef.value[virtualRow.index];
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            class={{
                              "virtual-table-cell": true,
                              "virutal-table-selection-cell":
                                cell.column.id === "selection",
                              truncate: cell.column.columnDef.ellipsis,
                            }}
                            key={cell.id}
                          >
                            <TableBodyCell
                              data-source={props.dataSource}
                              cell={cell}
                              enableEditing={props.enableEditing}
                              tableBodyCellEditFieldProps={
                                props.tableBodyCellEditFieldProps
                              }
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {paddingBottom > 0 && (
                  <tr>
                    <td style={{ height: `${paddingBottom}px` }} />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    };
  },
});
</script>
<style lang="less">
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  font-family: arial, sans-serif;
  table-layout: fixed;
  width: 100%;
}

.virtual-table {
  font-family: arial, sans-serif;
  @apply text-start;
  &-head {
    @apply sticky top-0 z-10;
    .virtual-table-cell {
      @apply relative text-black/[.88] font-semibold text-start bg-gray-2 border-b border-solid border-gray-4 transition-colors;
      &:not(:last-child, .virutal-table-selection-cell)::before {
        @apply absolute content-[''] top-1/2 end-0 w-[1px] h-[1.6em] bg-gray-4 -translate-y-1/2 transition-colors;
      }
    }
  }

  &-body {
    .virtual-table-cell {
      @apply border-b border-solid border-gray-4 transition-colors;
    }
  }

  &-cell {
    @apply p-4 break-words;
    &.virutal-table-selection-cell {
      @apply p-2;
    }
  }

  &--bordered {
    @apply border-l border-gray-4 border-solid;
    table {
      @apply border-t border-gray-4 border-solid;
    }
    tr > td,
    tr > th {
      @apply border-b border-gray-4 border-solid;
      @apply border-r border-gray-4 border-solid;
    }
  }
}
</style>