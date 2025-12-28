import SeamVirtualScroll from "@/components/seamVirtualScroll";

const data = Array.from({ length: 50 }, (_, k) => ({
  value1: ++k,
  value2: `故障${k}`,
  value3: Math.round(Math.random() * 1000),
  value4: Math.round(Math.random() * 100),
  value5: (
    <span
      style={{
        color: k % 2 === 0 ? "#ffa800" : "#ea580c",
      }}>
      {k % 2 === 0 ? "处理中" : "已处理"}
    </span>
  ),
}));

export default function Chart6() {
  return (
    <SeamVirtualScroll
      rowHeight={50}
      styles={{
        header: { color: "rgba(255, 255, 255, 0.6)" },
        body: { color: "#3061DB" },
      }}
      column={[
        { title: "序号", dataIndex: "value1", noScroll: true },
        {
          title: "故障事件",
          dataIndex: "value2",
          align: "center",
          noScroll: true,
        },
        {
          title: "异常次数",
          dataIndex: "value3",
          align: "right",
          noScroll: true,
        },
        {
          title: "报警次数",
          dataIndex: "value4",
          align: "right",
          noScroll: true,
        },
        {
          title: "是否解决",
          dataIndex: "value5",
          align: "right",
          noScroll: true,
        },
      ]}
      data={data}
    />
  );
}
