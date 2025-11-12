import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 
export const getGA4Properties = async (clientId) => {
  const res = await axios.get(`${API_URL}/google/ga4/properties/${clientId}`);
  return res.data;
};

export const selectGA4Property = async (clientId, propertyId, propertyName) => {
  const res = await axios.post(`${API_URL}/google/ga4/select-property`, {
    clientId,
    propertyId,
    propertyName,
  });

  console.log(res.data);
  return res.data;
};

export const fetchGA4Metrics = async (clientId) => {
    try {
          const res = await axios.get(`${API_URL}/google/ga4/metrics/${clientId}`);
  console.log(res.data);
  return res.data.data;
    } catch (error) {
        console.log("Error", error.message)
    }

};


// --- Search Console --- //

export const getSearchConsoleSites = async (clientId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/google/search-console/sites/${clientId}`);
  return res.data; // { success, sites, selected }
};

export const selectSearchConsoleSite = async (clientId, siteUrl) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/google/search-console/select-site`, {
    clientId,
    siteUrl,
  });
  return res.data;
};

export const fetchSearchConsoleMetrics = async (clientId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/google/search-console/metrics/${clientId}`);
  return res.data.data; // metrics response
};
