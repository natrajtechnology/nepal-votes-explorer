import { useState } from "react";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { electionResults, parties } from "@/data/mockData";
import { CheckCircle2, XCircle, Download, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ElectionResultsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [partyFilter, setPartyFilter] = useState("all");

  const filteredResults = electionResults.filter((result) => {
    const matchesSearch = 
      result.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.winner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty = partyFilter === "all" || result.party === partyFilter;
    return matchesSearch && matchesParty;
  });

  const getPartyColor = (partyName: string) => {
    const party = parties.find((p) => p.name === partyName);
    return party?.color || "#808080";
  };

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="section-title text-3xl">Election 2079 Results</h1>
        <p className="section-subtitle">
          Federal Parliament constituency-wise results and candidate profiles
        </p>
      </motion.div>

      {/* Party Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8"
      >
        {parties.slice(0, 8).map((party, index) => (
          <motion.div
            key={party.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            className="stat-card p-4 text-center cursor-pointer hover:scale-105 transition-transform"
            style={{ borderLeftColor: party.color, borderLeftWidth: 4 }}
          >
            <p className="text-2xl font-bold" style={{ color: party.color }}>
              {party.seats}
            </p>
            <p className="text-xs text-muted-foreground font-medium">{party.shortName}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="flex-1">
          <Input
            placeholder="Search constituency, candidate, or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={partyFilter} onValueChange={setPartyFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by party" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parties</SelectItem>
            {parties.map((party) => (
              <SelectItem key={party.id} value={party.name}>
                {party.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </motion.div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="stat-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Constituency</th>
                <th>Province / District</th>
                <th>Winner</th>
                <th>Party</th>
                <th>Votes</th>
                <th>Runner-up</th>
                <th>Margin</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <motion.tr
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <td className="font-semibold">{result.constituency}</td>
                  <td>
                    <div className="text-sm">
                      <span className="text-muted-foreground">{result.province}</span>
                      <br />
                      {result.district}
                    </div>
                  </td>
                  <td className="font-medium">{result.winner}</td>
                  <td>
                    <span 
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getPartyColor(result.party) }}
                    >
                      {parties.find((p) => p.name === result.party)?.shortName}
                    </span>
                  </td>
                  <td className="mono font-semibold">{result.votes.toLocaleString()}</td>
                  <td>
                    <div className="text-sm">
                      {result.runnerUp}
                      <br />
                      <span 
                        className="text-xs"
                        style={{ color: getPartyColor(result.runnerUpParty) }}
                      >
                        {parties.find((p) => p.name === result.runnerUpParty)?.shortName} ({result.runnerUpVotes.toLocaleString()})
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`font-semibold ${result.margin > 5000 ? "text-success" : result.margin > 2000 ? "text-warning" : "text-primary"}`}>
                      +{result.margin.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    {result.elected ? (
                      <span className="badge-elected">
                        <CheckCircle2 className="h-3 w-3" />
                        Elected
                      </span>
                    ) : (
                      <span className="badge-not-elected">
                        <XCircle className="h-3 w-3" />
                        Not Elected
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No results found matching your criteria.
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border p-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredResults.length} of {electionResults.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ElectionResultsPage;
