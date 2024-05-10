
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
};

export interface UserCalcStats {
  booksread: number;
  howManyReviews: number;
  averageRating: number;
  totalPages: number;
  ratings: number[];
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
