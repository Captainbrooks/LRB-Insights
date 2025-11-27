
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function MetaAdSetSelector({ adSets, selectedAdSet, onSelect }) {
  return (
    <Select value={selectedAdSet} onValueChange={onSelect}>
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Select an Ad Set" />
      </SelectTrigger>

      <SelectContent>
        {adSets.map((a) => (
          <SelectItem key={a.id} value={a.id}>
            {a.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
