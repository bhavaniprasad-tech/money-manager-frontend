import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DEFAULT_COLORS = ["#7e22ce", "#10b981", "#ef4444", "#f59e0b", "#3b82f6"];

const CustomPieChart = ({
  data = [],
  colors = DEFAULT_COLORS,
  innerRadius = 60,
  outerRadius = 80,
  height = 250,
  label,
  totalAmount,
  showTextAnchor = false,
}) => {
  const formattedData = (Array.isArray(data) ? data : []).map((d) => ({
    name: d.name || d.label || "",
    value: Number(d.value ?? d.amount ?? d.y) || 0,
  }));

  const total = formattedData.reduce((s, it) => s + (Number(it.value) || 0), 0);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={formattedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {formattedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => value?.toLocaleString?.() ?? value} />
        <Legend />

        {/* Center label / total */}
        {(label || totalAmount || showTextAnchor) && (
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            {label && <tspan x="50%" dy="-0.2em" style={{ fontSize: 14 }}>{label}</tspan>}
            {(totalAmount || total) && (
              <tspan x="50%" dy="1.2em" style={{ fontSize: 16, fontWeight: 700 }}>
                {totalAmount || total}
              </tspan>
            )}
          </text>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
