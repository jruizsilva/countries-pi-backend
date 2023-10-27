const axios = require("axios");

module.exports = {
  // Lo que devuelva una fn async sera una promise
  getAllCountries: async () => {
    const API = "https://restcountries.com/v3.1/all";
    try {
      const res = await axios.get(API);
      const data = res.data;
      return {
        data,
        success: true,
      };
    } catch (error) {
      return { success: false, err };
    }
  },

  getCountryByName: async (countryName = "") => {
    const API = `https://restcountries.com/v3.1/name/${countryName}`;
    try {
      const res = await axios.get(API);
      const data = res.data;
      return {
        data,
        success: true,
      };
    } catch (err) {
      return { success: false, err };
    }
  },

  getCountryByCode: async (countryCode = "") => {
    const API = `https://restcountries.com/v3.1/alpha/${countryCode}`;
    try {
      const res = await axios.get(API);
      const data = res.data;
      return {
        data,
        success: true,
      };
    } catch (error) {
      return { success: false, err };
    }
  },
};
