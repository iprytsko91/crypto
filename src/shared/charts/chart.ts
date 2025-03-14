declare const RGraph: any;

import { Ticker } from "../models";

export abstract class Chart {
  chart: any;

  abstract draw(containerId: string, data: Ticker[]): void;

  clear(containerId: string): void {
    const svg = document.getElementById(containerId);
    
    if (svg) {
      RGraph.SVG.clear(svg);
    }
  }

  protected calculatePadding(minValue: number, maxValue: number): number {
    const range = maxValue - minValue;
    const padding = 0.3;

    return range * padding;
  }
}
