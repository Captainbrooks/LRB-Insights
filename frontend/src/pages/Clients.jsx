import { clientProfiles } from "@/data/mockClient"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {useEffect, useState } from "react"
import { ClientCard } from "@/components/layout/ClientCard"


import axios from "axios"



export default function Clients() {

  const [clients, setClients] = useState([]);


    const [searchQuery, setSearchQuery] = useState("");

    const filteredClients = clientProfiles.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

   const activeClients = filteredClients.filter(c => c.status === "Active");
  const pausedClients = filteredClients.filter(c => c.status === "Paused");




  const fetchClients = async ()=>{
      try {

        const response= await axios.get(`${import.meta.env.VITE_API_URL}/clients/`);
        console.log("Fetched clients:", response.data);
        setClients(response.data);
        
      } catch (error) {
        console.error("Error fetching clients:", error.message); 
      }
    }

  useEffect(()=>{
    // fetch clients from backend
    fetchClients();
  },[])




  return (


        <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
          <p className="text-muted-foreground mt-1">
            Manage your client accounts and settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 text-sm">
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-muted-foreground">Total Clients</p>
            <p className="text-2xl font-bold">{clientProfiles.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-green-600">{activeClients.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Paused</p>
            <p className="text-2xl font-bold text-orange-600">{pausedClients.length}</p>
          </div>
        </div>
      </div>

      {clients.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Active Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <ClientCard key={client._id} client={client} fetchClients={fetchClients} />
            ))}
          </div>
        </div>
      )}

      {pausedClients.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Paused Clients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pausedClients.map((client) => (
              <ClientCard key={client.id} client={client}  />
            ))}
          </div>
        </div>
      )}

      {filteredClients.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No clients found matching your search.
        </div>
      )}
    </div>
      
  )
}
