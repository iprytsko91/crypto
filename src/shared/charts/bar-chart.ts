declare const RGraph: any;

import { Ticker } from '../models';
import { Chart } from './chart';

export class BarChart extends Chart {
  draw(containerId: string, data: Ticker[]) {
    const yValues = data.map(item => item.value);
    const maxValue = Math.max(...yValues);
    const minValue = Math.min(...yValues);
    const paddingValue = this.calculatePadding(minValue, maxValue)
    const yaxisScaleMax = Math.ceil(maxValue + paddingValue);
    const yaxisScaleMin = Math.floor(minValue - paddingValue);
    const xLabels = data.map(item => new Date(item.timestamp).toLocaleTimeString());

    this.clear(containerId);

    this.chart = new RGraph.SVG.Bar({
      id: containerId,
      data: yValues,
      options: {
        colors: ['blue'],
        xaxisLabels: xLabels,
        yaxis: true,
        yaxisScaleMax: yaxisScaleMax,
        yaxisScaleMin: yaxisScaleMin,
        textSize: 8,
        marginLeft: 50
      }
    }).draw();
  }
}
