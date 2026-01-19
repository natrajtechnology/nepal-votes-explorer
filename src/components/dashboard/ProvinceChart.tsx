import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { provinceVoterData } from "@/data/mockData";

export function ProvinceChart() {
  const data = provinceVoterData.map((p) => ({
    name: p.province,
    voters: p.voters2079,
    growth: p.growth,
    color: p.color,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 text-sm">
          <p className="font-semibold">{label}</p>
          <p className="text-primary">{payload[0].value.toLocaleString()} voters</p>
          <p className="text-muted-foreground text-xs">
            Growth: +{provinceVoterData.find((p) => p.province === label)?.growth}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="stat-card"
    >
      <h3 className="section-title">Province-wise Voter Distribution</h3>
      <p className="section-subtitle">Election 2079 registered voters by province</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={100}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="voters" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
