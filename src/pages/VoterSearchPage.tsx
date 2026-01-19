import { useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { voterSearchResults, provinces } from "@/data/mockData";
import { Search, User, MapPin, Download, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const VoterSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof voterSearchResults>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setResults(voterSearchResults);
      setIsSearching(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="section-title text-3xl">Voter Search System</h1>
        <p className="section-subtitle">
          Search across 18M+ voter records with advanced filtering
        </p>
      </motion.div>

      {/* Search Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="stat-card mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Type */}
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (नाम)</SelectItem>
              <SelectItem value="voter_id">Voter ID</SelectItem>
              <SelectItem value="location">Location</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Input
              placeholder={
                searchType === "name" 
                  ? "Enter name in Nepali or English..." 
                  : searchType === "voter_id"
                  ? "Enter Voter ID (e.g., V001234567)..."
                  : "Enter location name..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pr-10"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Button onClick={handleSearch} disabled={isSearching} className="gap-2">
            <Search className="h-4 w-4" />
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
          <Select value={provinceFilter} onValueChange={setProvinceFilter}>
            <SelectTrigger className="w-[180px]">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {provinces.map((p) => (
                <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-[150px]">
              <User className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </motion.div>

      {/* Search Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              Search Results 
              <span className="text-muted-foreground font-normal ml-2">
                ({results.length} records found)
              </span>
            </h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Voter ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Province</th>
                  <th>District</th>
                  <th>Municipality</th>
                  <th>Ward</th>
                  <th>Booth</th>
                </tr>
              </thead>
              <tbody>
                {results.map((voter, index) => (
                  <motion.tr
                    key={voter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="cursor-pointer hover:bg-primary/5"
                  >
                    <td className="mono text-xs font-medium">{voter.id}</td>
                    <td className="font-medium">{voter.name}</td>
                    <td>
                      <Badge variant={voter.gender === "Male" ? "secondary" : "default"}>
                        {voter.gender}
                      </Badge>
                    </td>
                    <td>{voter.age}</td>
                    <td className="text-sm">{voter.province}</td>
                    <td className="text-sm">{voter.district}</td>
                    <td className="text-sm">{voter.municipality}</td>
                    <td className="text-center">{voter.ward}</td>
                    <td className="text-center">{voter.booth}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border p-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-{results.length} of 18,456,789 records
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Page 1 of 1,845,679
              </span>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {results.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="stat-card text-center py-16"
        >
          <Search className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Search the Voter Database</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter a name, voter ID, or location to search across 18+ million voter records 
            from the Election Commission of Nepal.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Badge variant="outline">Nepali Unicode Support</Badge>
            <Badge variant="outline">Server-side Pagination</Badge>
            <Badge variant="outline">Privacy Masking</Badge>
            <Badge variant="outline">CSV Export</Badge>
          </div>
        </motion.div>
      )}

      {/* Privacy Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 rounded-lg bg-muted/50 border border-border"
      >
        <p className="text-xs text-muted-foreground text-center">
          🔒 <strong>Privacy Notice:</strong> Voter data is sourced from the Election Commission of Nepal 
          and is subject to privacy regulations. Personal information may be partially masked for privacy protection.
        </p>
      </motion.div>
    </MainLayout>
  );
};

export default VoterSearchPage;
