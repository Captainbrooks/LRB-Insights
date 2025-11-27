
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function MetaAdSelector({ ads, selectedAd, onSelect }) {
  return (
    <Select value={selectedAd} onValueChange={onSelect}>
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Select an Ad" />
      </SelectTrigger>

      <SelectContent>
        {ads.map((ad) => (
          <SelectItem key={ad.id} value={ad.id}>
            {ad.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
