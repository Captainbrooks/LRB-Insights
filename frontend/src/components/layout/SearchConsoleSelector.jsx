import { useEffect, useState } from "react";
import {
  getSearchConsoleSites,
  selectSearchConsoleSite,
  fetchSearchConsoleMetrics,
} from "@/api/googleApi";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import SearchConsoleChart from "@/components/layout/SearchConsoleChart";

export default function SearchConsoleSelector({ clientId }) {
  const [sites, setSites] = useState([]);
  const [selected, setSelected] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSites() {
      setLoading(true);
      try {
        const { sites, selected } = await getSearchConsoleSites(clientId);
        setSites(sites || []);
        if (selected) {
          setSelected(selected);
          const data = await fetchSearchConsoleMetrics(clientId);
          setMetrics(data);
        }
      } catch (err) {
        console.error("Error loading Search Console sites:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSites();
  }, [clientId]);

  const handleSelect = async (siteUrl) => {
    setSelected(siteUrl);
    try {
      await selectSearchConsoleSite(clientId, siteUrl);
      const data = await fetchSearchConsoleMetrics(clientId);
      setMetrics(data);
    } catch (err) {
      console.error("Error saving Search Console site:", err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3">
        <Select
          value={selected}
          onValueChange={(val) => handleSelect(val)}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder={loading ? "Loading..." : "Select Verified Site"} />
          </SelectTrigger>
          <SelectContent>
            {sites.map((s) => (
              <SelectItem key={s.url} value={s.url}>
                {s.url}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selected && <Button variant="secondary">Active</Button>}
      </div>

      {metrics && (
        <div className="mt-6">
          <SearchConsoleChart data={metrics} />
        </div>
      )}
    </div>
  );
}
