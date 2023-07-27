import React from "react";
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
import '../Styles/PortfolioValueChart.css'
const data = [
  { name: "Jan", intialValue: 9000, tradeProfit : 100, bankTransfer: 100 },
  { name: "Feb", intialValue: 9000, tradeProfit: -150, bankTransfer: 200 },
  { name: "Mar", intialValue: 9000, tradeProfit: 250, bankTransfer: 300 },
  { name: "Apr", intialValue: 9000, tradeProfit: 500, bankTransfer: 400 },
  { name: "May", intialValue: 9000, tradeProfit: 1000, bankTransfer: 500 },
  { name: "Jun", intialValue: 9000, tradeProfit: 980, bankTransfer: 600 },
  { name: "Jul", intialValue: 9000, tradeProfit: 1400, bankTransfer: 700 },
];

function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
       <p className="bankTransferLabel">{`Bank Transfer Value: $${payload[2].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</p>
        <p className="tradingProfitLabel">{`Trading Pofit: $${payload[1].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</p>
          <p className="initialValueLabel">{`Initial Value: $${payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</p>
          <p className="totalLabel">{`Total: $${(payload[0].value + payload[1].value + payload[2].value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}</p>
        </div>
      );
    }
  
    return null;
}

const PortfolioValueChart = ({ portfolio }) => {
  return (
    <>
      <h2>Portfolio Value</h2>
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
          <XAxis dataKey="name" />
          <YAxis type="number" allowDataOverflow={true} domain={[8000, 12000]}/>
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Area
            type="monotone"
            dataKey="intialValue"
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
