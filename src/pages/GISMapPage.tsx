import { useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { NepalMap } from "@/components/map/NepalMap";
import { provinceVoterData, provinces } from "@/data/mockData";
import { ChevronRight, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const GISMapPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="section-title text-3xl">GIS Map System</h1>
        <p className="section-subtitle">Interactive visualization of Nepal's electoral geography</p>
      </motion.div>

      {/* Breadcrumb Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 text-sm mb-6"
      >
        <Button variant="ghost" size="sm" className="text-primary">
          Nepal
        </Button>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Select Province</span>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <NepalMap />
        </div>

        {/* Province List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <h3 className="section-title">Provinces</h3>
          <p className="section-subtitle">7 provinces with 77 districts</p>
          
          <div className="space-y-2">
            {provinces.map((province, index) => {
              const voterData = provinceVoterData.find(
                (p) => p.province === province.name.split(" ")[0].replace("Province", "").trim() || 
                       p.province === province.name.match(/\(([^)]+)\)/)?.[1]
              );
              
              return (
                <motion.button
                  key={province.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setSelectedProvince(province.id === selectedProvince ? null : province.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedProvince === province.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{province.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Capital: {province.capital}
                      </p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {province.districts} districts
                    </span>
                  </div>
                  
                  {selectedProvince === province.id && voterData && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border space-y-3"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Voters:</span>
                        <span className="font-semibold">{voterData.voters2079.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-muted-foreground">Growth:</span>
                        <span className="growth-positive">+{voterData.growth}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-secondary/10 p-2 rounded">
                          <span className="text-muted-foreground">Male</span>
                          <p className="font-semibold">{voterData.male.toLocaleString()}</p>
                        </div>
                        <div className="bg-primary/10 p-2 rounded">
                          <span className="text-muted-foreground">Female</span>
                          <p className="font-semibold">{voterData.female.toLocaleString()}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Map Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 stat-card"
      >
        <h3 className="font-semibold mb-4">Map Legend</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--map-low))]" />
            <span className="text-sm text-muted-foreground">Low Density (&lt;2M voters)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--map-medium))]" />
            <span className="text-sm text-muted-foreground">Medium Density (2-3M voters)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[hsl(var(--map-high))]" />
            <span className="text-sm text-muted-foreground">High Density (&gt;3M voters)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Province Capital</span>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default GISMapPage;
