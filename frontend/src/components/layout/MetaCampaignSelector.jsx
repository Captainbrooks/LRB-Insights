import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export function MetaCampaignSelector({ campaigns, selectedCampaign, onSelect }) {
  return (
    <Select value={selectedCampaign} onValueChange={onSelect}>
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Select a campaign" />
      </SelectTrigger>

      <SelectContent>
        {campaigns.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
