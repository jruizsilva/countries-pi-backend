const formatCountries = (countries) => {
  return countries.map((country) => {
    const {
      name,
      capital,
      region: continent,
      subregion,
      area,
      flag,
      flags,
      population,
    } = country;

    return {
      name: name.common,
      capital: capital && capital.length > 0 ? capital[0] : "",
      continent,
      subregion,
      area,
      flag: flag || "unknown",
      flag_image: flags.png,
      population,
    };
  });
};

module.exports = { formatCountries };
