import { useEffect, useState } from "react";
import { getGA4Properties, selectGA4Property, fetchGA4Metrics } from "@/api/googleApi";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import GA4Chart from "./GA4Chart";

export default function GA4Selector({ clientId, onSelected }) {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { properties, selected } = await getGA4Properties(clientId);
        setProperties(properties);
        if (selected) {
          setSelected(selected);
          // Automatically fetch metrics for the already-selected property
          const data = await fetchGA4Metrics(clientId);
          setMetrics(data);
        }
      } catch (err) {
        console.error("Error loading GA4 properties:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [clientId]);

  const handleSelect = async (propertyId, propertyName) => {
    setSelected(propertyId);
    try {
      await selectGA4Property(clientId, propertyId, propertyName);
      onSelected?.(propertyId);
      const data = await fetchGA4Metrics(clientId);
      setMetrics(data);
    } catch (err) {
      console.error("Error saving GA4 property:", err.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3">
        <Select
          value={selected}
          onValueChange={(val) => {
            const prop = properties.find((p) => p.id === val);
            handleSelect(val, prop?.name);
          }}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder={loading ? "Loading..." : "Select GA4 Property"} />
          </SelectTrigger>
          <SelectContent>
            {properties.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selected && <Button variant="secondary">Active</Button>}
      </div>

      {metrics && (
  <div className="mt-6">
    <GA4Chart data={metrics} />
  </div>
)}

    </div>
  );
}
