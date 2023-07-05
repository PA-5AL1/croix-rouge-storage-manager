import ReactEChartsCore from "echarts-for-react/lib/core";
import { PieChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { memo, useEffect, useState } from "react";

echarts.use([TooltipComponent, GridComponent, PieChart, CanvasRenderer]);

function Line({ theme = "light", style = {}, option = {} }) {
  const [echartRef, setRef] = useState<ReactEChartsCore | null>(null);
  useEffect(() => {
    if (echartRef) {
      echartRef.getEchartsInstance().setOption(option);
    }
    // eslint-disable-next-line
  }, [option]);
  return (
    <ReactEChartsCore
      key="echart"
      ref={setRef}
      echarts={echarts}
      option={option}
      theme={theme}
      style={style}
      notMerge={true}
      lazyUpdate={true}
    />
  );
}

export default memo(Line, (prev, next) => prev.option === next.option);
