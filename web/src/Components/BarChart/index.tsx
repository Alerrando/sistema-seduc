import { Bar } from "react-chartjs-2";
import { ChartData, CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
Chart.register(CategoryScale);

interface LineChartProps {
  data: ChartData;
}

export default function BarChart({ data }: LineChartProps) {
  return (
    <>
        <Bar
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
            className="w-[100%!important] h-[13rem!important] md:h-[22rem!important]"

        />
    </>
  );
}
