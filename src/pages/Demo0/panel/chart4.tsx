import SeamVirtualScroll from "@/components/seamVirtualScroll";

export default function Charts4() {
  return (
    <SeamVirtualScroll
      rowHeight={50}
      column={[
        { title: "", dataIndex: "value1" },
        { title: "类型", dataIndex: "value2" },
        { title: "数量(万)", dataIndex: "value3" },
        { title: "贸易值(万元)", dataIndex: "value4" },
      ]}
      data={Array.from({ length: 100 }, (_, k) => ({
        value1: `${k + 1}`,
        value2: `类型${k + 1}`,
        value3: (Math.random() * 100).toFixed(2),
        value4: (Math.random() * 1000).toFixed(2),
      }))}
    />
  );
}
