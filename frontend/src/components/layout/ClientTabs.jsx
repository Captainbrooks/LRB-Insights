import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ClientTabs({ clients, activeClient, onClientChange }) {
  return (
    <Tabs value={activeClient} onValueChange={onClientChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-muted/50">
        {clients.map((client) => (
          <TabsTrigger
            key={client.id}
            value={client.id}
            className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
          >
            {client.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
