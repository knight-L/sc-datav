import SeamVirtualScroll from "@/components/seamVirtualScroll";

import cityData from "./cityData";

const keys = Object.keys(cityData);

export default function Charts3() {
  return (
    <SeamVirtualScroll
      rowHeight={50}
      styles={{
        header: { color: "rgba(0, 0, 0, 0.6)" },
        body: { color: "#000000" },
      }}
      column={[
        { title: "省份", dataIndex: "value1", noScroll: true },
        {
          title: "专利编号",
          dataIndex: "value2",
          align: "center",
          noScroll: true,
        },
        {
          title: "处罚金额",
          dataIndex: "value3",
          align: "right",
          noScroll: true,
        },
        {
          title: "同比百分比",
          dataIndex: "value4",
          align: "right",
          noScroll: true,
        },
      ]}
      data={Array.from({ length: keys.length }, (_, k) => {
        const value4 = Math.random() * 100;

        return {
          value1: keys[k],
          value2: `ZL${Math.round(Math.random() * 10000000)}`,
          value3: (Math.random() * 1000).toLocaleString("zh-CN", {
            maximumFractionDigits: 2,
          }),
          value4: (
            <span
              style={{
                color:
                  value4 > 90 ? "#fbdf88" : value4 > 60 ? "#ffa800" : "#ea580c",
              }}>
              {value4
                .toLocaleString("zh-CN", {
                  maximumFractionDigits: 2,
                })
                .concat("%")}
            </span>
          ),
        };
      })}
    />
  );
}
