import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ageDistribution } from "@/data/mockData";

export function AgeDistributionChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 text-sm">
          <p className="font-semibold mb-2">Age Group: {label}</p>
          <div className="space-y-1">
            <p className="text-secondary">Male: {payload[0]?.value?.toLocaleString()}</p>
            <p className="text-primary">Female: {payload[1]?.value?.toLocaleString()}</p>
            <p className="text-muted-foreground border-t border-border pt-1 mt-1">
              Total: {(payload[0]?.value + payload[1]?.value)?.toLocaleString()}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="stat-card"
    >
      <h3 className="section-title">Age Distribution</h3>
      <p className="section-subtitle">Voter demographics by age group</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ageDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="ageGroup" 
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => <span className="text-foreground text-sm capitalize">{value}</span>}
            />
            <Bar 
              dataKey="male" 
              name="Male" 
              fill="hsl(var(--secondary))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="female" 
              name="Female" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
