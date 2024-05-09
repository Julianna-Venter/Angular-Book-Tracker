export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};

export type PolarChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};

export interface UserCalcStats {
  booksread: number;
  howManyReviews: number;
  averageRating: number;
  totalPages: number;
  OneStarReviews: number;
  TwoStarReviews: number;
  ThreeStarReviews: number;
  FourStarReviews: number;
  FiveStarReviews: number;
  slowPaced: number;
  fastPaced: number;
  moderatePaced: number;
  longBooks: number;
  shortBooks: number;
  mediumBooks: number;
  character: number;
  plot: number;
  tense: number;
  lighthearted: number;
  dark: number;
  light: number;
  informative: number;
  fun: number;
  adventurous: number;
  grounded: number;
  reflective: number;
  action: number;
  DNF: number;
}
