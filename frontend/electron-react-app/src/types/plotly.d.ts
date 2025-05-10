declare module 'plotly.js' {
  export interface PlotData {
    type?: string;
    x?: any[];
    y?: any[];
    mode?: string;
    name?: string;
    line?: {
      color?: string;
      width?: number;
      dash?: string;
    };
    marker?: {
      color?: string | string[];
      size?: number | number[];
      symbol?: string | string[];
    };
    [key: string]: any;
  }

  export interface Layout {
    title?: string;
    xaxis?: {
      title?: string;
      range?: [number, number];
      type?: string;
    };
    yaxis?: {
      title?: string;
      range?: [number, number];
      type?: string;
    };
    showlegend?: boolean;
    [key: string]: any;
  }

  export interface Config {
    responsive?: boolean;
    displayModeBar?: boolean;
    [key: string]: any;
  }

  export function newPlot(
    root: HTMLElement,
    data: PlotData[],
    layout?: Layout,
    config?: Config
  ): Promise<void>;

  export function react(
    root: HTMLElement,
    data: PlotData[],
    layout?: Layout,
    config?: Config
  ): Promise<void>;

  export function purge(root: HTMLElement): void;
} 