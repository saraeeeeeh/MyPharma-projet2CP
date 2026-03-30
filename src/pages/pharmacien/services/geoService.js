export const geoService = {
  reverseGeocode: async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      if (data && data.display_name) {
        return { success: true, address: data.display_name };
      }
      return { success: false, address: "" };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  }
};
