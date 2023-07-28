import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "../Styles/PortfolioValueChart.css";
import { calculateChartDataAPI } from "../api";
const sampleData = [
  {
    date: "2023-01-27",
    intialValue: 9000,
    tradeProfit: 100.68,
    bankTransfer: 100,
  },
  {
    date: "2023-02-27",
    intialValue: 9000,
    tradeProfit: -150.23,
    bankTransfer: 200,
  },
  {
    date: "2023-03-27",
    intialValue: 9000,
    tradeProfit: 250,
    bankTransfer: 300,
  },
  {
    date: "2023-04-27",
    intialValue: 9000,
    tradeProfit: 500.4444444444444455555345345253452,
    bankTransfer: 400,
  },
  {
    date: "2023-04-28",
    intialValue: 9000,
    tradeProfit: 1000,
    bankTransfer: 500,
  },
  {
    date: "2023-07-27",
    intialValue: 9000,
    tradeProfit: 980,
    bankTransfer: 600,
  },
  {
    date: "2023-10-27",
    intialValue: 9000,
    tradeProfit: 1400,
    bankTransfer: 700,
  },
];

function CustomTooltip({ payload, label, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="dateLabel"> {label}</p>
        <p className="bankTransferLabel">{`Bank Transfer Value: $${payload[2].value.toLocaleString(
          "en-US",
          { minimumFractionDigits: 2 }
        )}`}</p>
        <p className="tradingProfitLabel">{`Trading Pofit: $${payload[1].value.toLocaleString(
          "en-US",
          { minimumFractionDigits: 2 }
        )}`}</p>
        <p className="initialValueLabel">{`Initial Value: $${payload[0].value.toLocaleString(
          "en-US",
          { minimumFractionDigits: 2 }
        )}`}</p>
        <h4 className="totalLabel">{`Total: $${(
          payload[0].value +
          payload[1].value +
          payload[2].value
        ).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</h4>
      </div>
    );
  }

  return null;
}

const PortfolioValueChart = ({ portfolio }) => {
  const [data, setData] = useState(sampleData);
  // get the data for the area chart
  useEffect(() => {
    const getChartData = async () => {
      const chartDataResponse = await calculateChartDataAPI(
        portfolio.id,
        portfolio.createdAt,
        portfolio.initialValue
      );
      setData(chartDataResponse);
    };
    getChartData();
  }, [portfolio.id, portfolio.createdAt, portfolio.initialValue]);

  return (
    <>
      <h2>Recognized Portfolio Value</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={700} // The chart width is set to 100% of the container
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            allowDataOverflow={true}
            domain={[8000, 12000]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="initialValue" // It should be "initialValue" instead of "intialValue"
            stackId="1"
            stroke="#6D3CD8"
            strokeWidth={2}
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="tradeProfit"
            stackId="1"
            stroke="#45C876"
            strokeWidth={2}
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="bankTransfer"
            stackId="1"
            stroke="#FFAB39"
            strokeWidth={2}
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default PortfolioValueChart;
