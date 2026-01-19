import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { provinceVoterData, genderTrend } from "@/data/mockData";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, ScatterChart, Scatter, ZAxis 
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from "lucide-react";

const ComparativeAnalysisPage = () => {
  const comparisonData = provinceVoterData.map((p) => ({
    province: p.province,
    "2074": p.voters2074,
    "2079": p.voters2079,
    growth: p.growth,
  }));

  const growthScatterData = provinceVoterData.map((p) => ({
    province: p.province,
    voters2074: p.voters2074 / 1000000,
    voters2079: p.voters2079 / 1000000,
    growth: p.growth,
    size: p.growth * 10,
    color: p.growth > 18 ? "hsl(var(--success))" : p.growth > 15 ? "hsl(var(--warning))" : "hsl(var(--primary))",
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 text-sm">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getGrowthIndicator = (growth: number) => {
    if (growth > 18) return { icon: ArrowUpRight, class: "text-success bg-success/10", label: "High Growth" };
    if (growth > 12) return { icon: TrendingUp, class: "text-warning bg-warning/10", label: "Moderate" };
    return { icon: Minus, class: "text-muted-foreground bg-muted", label: "Low Growth" };
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="section-title text-3xl">Comparative Analysis</h1>
        <p className="section-subtitle">
          Side-by-side comparison of voter data between Election 2074 and 2079
        </p>
      </motion.div>

      {/* Growth Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8"
      >
        {provinceVoterData.map((province, index) => {
          const indicator = getGrowthIndicator(province.growth);
          return (
            <motion.div
              key={province.province}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
              className="stat-card p-4"
            >
              <p className="text-xs text-muted-foreground font-medium mb-1">{province.province}</p>
              <div className="flex items-center gap-2">
                <span className={`p-1 rounded-full ${indicator.class}`}>
                  <indicator.icon className="h-3 w-3" />
                </span>
                <span className="text-lg font-bold">+{province.growth}%</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Comparison Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="section-title">Province Comparison (2074 vs 2079)</h3>
          <p className="section-subtitle">Voter count by province across election years</p>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="province" 
                  width={90}
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="2074" name="2074 BS" fill="hsl(var(--muted-foreground))" radius={[0, 4, 4, 0]} />
                <Bar dataKey="2079" name="2079 BS" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gender Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <h3 className="section-title">Gender Trend Over Time</h3>
          <p className="section-subtitle">Male vs Female voter growth across elections</p>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={genderTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="male" 
                  name="Male" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="female" 
                  name="Female" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Growth Scatter Plot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="stat-card"
      >
        <h3 className="section-title">Growth Analysis Scatter Plot</h3>
        <p className="section-subtitle">Bubble size represents growth percentage</p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="voters2074" 
                name="2074 Voters" 
                unit="M"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                label={{ value: "Voters 2074 (Millions)", position: "bottom", fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                type="number" 
                dataKey="voters2079" 
                name="2079 Voters" 
                unit="M"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                label={{ value: "Voters 2079 (Millions)", angle: -90, position: "left", fill: "hsl(var(--muted-foreground))" }}
              />
              <ZAxis type="number" dataKey="size" range={[100, 500]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="glass-panel p-3 text-sm">
                        <p className="font-semibold">{data.province}</p>
                        <p>2074: {(data.voters2074).toFixed(2)}M voters</p>
                        <p>2079: {(data.voters2079).toFixed(2)}M voters</p>
                        <p className="text-success font-semibold">Growth: +{data.growth}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                name="Provinces" 
                data={growthScatterData} 
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">High Growth (&gt;18%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-warning" />
            <span className="text-sm text-muted-foreground">Moderate (15-18%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Standard (&lt;15%)</span>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ComparativeAnalysisPage;
