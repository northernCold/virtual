import { reactive, ref, watch } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";

export default function (options) {
  const visibleRowRef = ref([]);
  const { dataSource, scrollElement, table } = options;

  const virtualOptionsRef = reactive({
    count: visibleRowRef.value.length,
    getScrollElement: () => scrollElement.value,
    estimateSize: () => 50,
    overscan: 10,
  });

  watch(
    dataSource,
    () => {
      const { rows } = table.getRowModel();
      visibleRowRef.value = rows;
      virtualOptionsRef.count = visibleRowRef.value.length;
    },
    { immediate: true, deep: true }
  );

  const virtualizer = useVirtualizer(virtualOptionsRef);

  return [virtualizer, visibleRowRef]
}
