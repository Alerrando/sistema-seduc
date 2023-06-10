import { Doughnut } from "react-chartjs-2";
import { DoughnutChart, CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
Chart.register(CategoryScale);

interface DoughnutChart {
  data: DoughnutChart;
}

export default function DoughnutChartChart({ data }: DoughnutChart) {
  return (
    <>
        <Doughnut
            data={data}
            options={{
                plugins: {
                title: { display: true, text: "Quantidade de cadastro por mês" },
                legend: {
                    display: false,
                },
                },
                responsive: true,
                backgroundColor: "#222831"
            }}
            className="w-[100%!important] h-[100%!important]"
        />
    </>
  );
}
