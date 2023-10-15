import { computed, defineComponent, ref, unref, watch } from "vue";
import { bool, func, object, oneOfType, array } from "vue-types";
import { FlexRender } from "@tanstack/vue-table";
import { Input } from "ant-design-vue";
import { omit } from "lodash-es";

export default defineComponent({
  props: {
    dataSource: array(),
    enableEditing: oneOfType([bool(), func()]),
    cell: object(),
    tableBodyCellEditFieldProps: object(),
  },
  setup(props) {
    const {
      column: { columnDef },
      row,
    } = props.cell;
    const _columnDef = columnDef;

    const isEditable = computed(() => {
      return (
        (props.enableEditing instanceof Function
          ? props.enableEditing(row)
          : props.enableEditing) &&
        (typeof _columnDef.enableEditing === "function"
          ? _columnDef.enableEditing(row)
          : _columnDef.enableEditing !== false)
      );
    });

    const isEditing = computed(() => {
      return unref(isEditable) && props.cell.column.id !== "select";
    });

    const params = {
      cell: props.cell,
      column: props.cell.column,
      row: props.cell.row,
    };
    const globalTableBodyCellEditFieldProps =
      props.tableBodyCellEditFieldProps instanceof Function
        ? props.tableBodyCellEditFieldProps(params)
        : props.tableBodyCellEditFieldProps;

    const scopeTableBodyCellEditFieldProps =
      _columnDef.tableBodyCellEditFieldProps instanceof Function
        ? _columnDef.tableBodyCellEditFieldProps(params)
        : _columnDef.tableBodyCellEditFieldProps;

    const fieldProps = {
      ...globalTableBodyCellEditFieldProps,
      ...scopeTableBodyCellEditFieldProps,
    };

    const value = ref(row.original[props.cell?.column.id]);

    const onChange = (e) => {
      fieldProps.onChange?.(e);
      value.value = e.target.value;
    };

    return () =>
      isEditing.value ? (
        <Input
          value={value.value}
          onChange={onChange}
          {...omit(fieldProps, "onChange")}
        />
      ) : (
        <FlexRender
          render={props.cell.column.columnDef.cell}
          props={props.cell.getContext()}
        />
      );
  },
});
