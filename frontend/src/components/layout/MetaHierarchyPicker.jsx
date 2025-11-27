import { useState, useEffect } from "react";
import { MetaCampaignSelector } from "./MetaCampaignSelector";
import { MetaAdSetSelector } from "./MetaAdSetSelector";
import { MetaAdSelector } from "./MetaAdSelector";
import { MetaAdInsights } from "./MetaAdInsights";

export default function MetaHierarchyPicker({ clientId }) {
  const [campaigns, setCampaigns] = useState([]);
  const [adSets, setAdSets] = useState([]);
  const [ads, setAds] = useState([]);

  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedAdSet, setSelectedAdSet] = useState("");
  const [selectedAd, setSelectedAd] = useState("");

  const [adInsights, setAdInsights] = useState(null);

  // Fetch campaigns once
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/meta/meta-campaigns/${clientId}`)
      .then((r) => r.json())
      .then((d) => setCampaigns(d.campaigns || []));
  }, [clientId]);

  // When selecting campaign → load ad sets
  const handleCampaignSelect = (id) => {
    setSelectedCampaign(id);
    setSelectedAdSet("");
    setSelectedAd("");
    setAdInsights(null);

    fetch(`${import.meta.env.VITE_API_URL}/meta/meta-adsets/${clientId}/${id}`)
      .then((r) => r.json())
      .then((d) => setAdSets(d.adSets || []));
  };

  // When selecting ad set → load ads
  const handleAdSetSelect = (id) => {
    setSelectedAdSet(id);
    setSelectedAd("");
    setAdInsights(null);

    fetch(`${import.meta.env.VITE_API_URL}/meta/meta-ads/${clientId}/${id}`)
      .then((r) => r.json())
      .then((d) => setAds(d.ads || []));
  };

  // When selecting ad → load insights
  const handleAdSelect = (id) => {
    setSelectedAd(id);

    fetch(
      `${import.meta.env.VITE_API_URL}/meta/meta-ad-insights/${clientId}/${id}`
    )
      .then((r) => r.json())
      .then((d) => 
        
        setAdInsights(d.insights || null));

  };

  return (
    <div className="space-y-4">
      {/* Campaign Dropdown */}
      <MetaCampaignSelector
        campaigns={campaigns}
        selectedCampaign={selectedCampaign}
        onSelect={handleCampaignSelect}
      />

      {/* AdSet Dropdown */}
      {selectedCampaign && (
        <MetaAdSetSelector
          adSets={adSets}
          selectedAdSet={selectedAdSet}
          onSelect={handleAdSetSelect}
        />
      )}

      {/* Ads Dropdown */}
      {selectedAdSet && (
        <MetaAdSelector
          ads={ads}
          selectedAd={selectedAd}
          onSelect={handleAdSelect}
        />
      )}

      {/* Insights */}
      {selectedAd && (
        <MetaAdInsights adId={selectedAd} insights={adInsights} />
      )}
    </div>
  );
}
