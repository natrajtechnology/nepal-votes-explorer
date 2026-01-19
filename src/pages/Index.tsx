import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProvinceChart } from "@/components/dashboard/ProvinceChart";
import { GenderPieChart } from "@/components/dashboard/GenderPieChart";
import { AgeDistributionChart } from "@/components/dashboard/AgeDistributionChart";
import { PartySeatsChart } from "@/components/dashboard/PartySeatsChart";
import { NepalMap } from "@/components/map/NepalMap";
import { overviewStats } from "@/data/mockData";
import { Users, TrendingUp, UserCheck, Calendar, MapPin, Vote, Building, Landmark } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🗳️</span>
          <h1 className="text-3xl lg:text-4xl font-bold">
            Nepal Election Data
            <span className="gradient-text block lg:inline lg:ml-2">Analysis & GIS</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Comprehensive voter analytics, interactive maps, and election results for 
          Nepal's Federal & Local Elections 2079 BS.
        </p>
      </motion.div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Voters"
          value={overviewStats.totalVoters2079}
          icon={Users}
          trend={{ value: overviewStats.growthPercentage, label: "vs 2074 election" }}
          delay={0}
        />
        <StatCard
          title="Net Growth"
          value={`+${(overviewStats.netGrowth / 1000000).toFixed(2)}M`}
          subtitle="New registrations since 2074"
          icon={TrendingUp}
          delay={0.1}
        />
        <StatCard
          title="Avg. Voter Age"
          value={`${overviewStats.averageAge} yrs`}
          subtitle="Median age: 36 years"
          icon={Calendar}
          delay={0.2}
        />
        <StatCard
          title="Gender Ratio"
          value={`${overviewStats.genderRatio}:1`}
          subtitle="Male to Female"
          icon={UserCheck}
          delay={0.3}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Constituencies"
          value={overviewStats.totalConstituencies}
          subtitle="Federal seats"
          icon={MapPin}
          delay={0.1}
        />
        <StatCard
          title="Candidates"
          value={overviewStats.totalCandidates}
          subtitle="Federal election 2079"
          icon={Vote}
          delay={0.15}
        />
        <StatCard
          title="Voting Booths"
          value={overviewStats.totalBooths}
          subtitle="Across all provinces"
          icon={Building}
          delay={0.2}
        />
        <StatCard
          title="Local Levels"
          value={overviewStats.localLevels}
          subtitle="Municipalities & rural"
          icon={Landmark}
          delay={0.25}
        />
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <NepalMap />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ProvinceChart />
        <GenderPieChart />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AgeDistributionChart />
        <PartySeatsChart />
      </div>
    </MainLayout>
  );
};

export default Index;
