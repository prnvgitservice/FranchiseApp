declare module 'react-native-svg-charts' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';

  interface PieChartProps {
    data: Array<{
      value: number;
      svg: { fill: string };
      key: string;
    }>;
    style?: ViewStyle;
    innerRadius?: number;
    outerRadius?: number;
  }

  export class PieChart extends Component<PieChartProps> {}
} 