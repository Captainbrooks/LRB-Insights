import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

// No TypeScript interface here — just plain JS props

const platforms = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn",
  "YouTube",
  "X (Twitter)",
  "TikTok",
];

const industries = [
  "Technology",
  "E-commerce",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Other",
];

export function AddClientDialog({ open, onOpenChange }) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");

  // const handlePlatformToggle = (platform) => {
  //   setSelectedPlatforms((prev) =>
  //     prev.includes(platform)
  //       ? prev.filter((p) => p !== platform)
  //       : [...prev, platform]
  //   );
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Temporary console log instead of backend


    const apiUrl = import.meta.env.VITE_API_URL ;

    console.log("apiUrl:", apiUrl);

    const body={
      clientName,
      clientEmail,
      industry,
      monthlyBudget: budget
    }


    try {

      const response = await axios.post(`${apiUrl}/clients/`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Client added successfully:", response.data);
      
    } catch (error) {
      console.error("Error adding client:", error.message);
    }

    onOpenChange(false);
    // Reset form
    setClientName("");
    setIndustry("");
    setBudget("");
    setClientEmail("");};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client profile and connect their marketing channels.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                placeholder="Enter client name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Email</Label>
              <Input
                id="client-email"
                placeholder="Enter client email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry} required>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Monthly Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="15000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            {/* Connected Channels */}
            {/* <div className="space-y-2">
              <Label>Connected Channels</Label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={() => handlePlatformToggle(platform)}
                    />
                    <label
                      htmlFor={platform}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {platform}
                    </label>
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Client</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default AddClientDialog;