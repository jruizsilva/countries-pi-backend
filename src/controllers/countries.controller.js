const { request, response } = require('express')
const { Op } = require('sequelize')
const restcountry = require('../api/restcountries')
const { formatCountries } = require('../helpers/formatCountries')
const { getCountriesDB } = require('../helpers/getCountriesDB')
const { saveCountriesDB } = require('../helpers/saveCountriesDB')
const { Country, Tourist_activity } = require('../database/db')

const getAllCountries = async (req = request, res = response) => {
  const { name: continentName } = req.params
  const { page, sort, superpoblados } = req.query
  const { results } = await getCountriesDB(
    page,
    continentName,
    sort,
    superpoblados
  )
  if (results && results.length > 0) {
    res.json(results)
    return
  }
  const { success, data, err } = await restcountry.getAllCountries()
  if (success) {
    const countries = formatCountries(data)
    await saveCountriesDB(countries)
    const { results } = await getCountriesDB(
      page,
      continentName,
      sort
    )
    if (results && results.length > 0) {
      res.json(results)
    }
  } else {
    res.json(err)
  }
}

const getCountryById = async (
  req = request,
  res = response,
  next
) => {
  const { id } = req.params
  try {
    const country = await Country.findOne({
      where: {
        id
      }
    })
    res.json(country)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getCountriesByName = async (
  req = request,
  res = response,
  next
) => {
  const { name } = req.query
  if (name) {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })
    res.json(countries)
  } else {
    next()
  }

  /*#region
  if (name) {
    const { success, data, err } = await restcountry.getCountryByName(name);
    if (success) {
      const country = formatCountry(data[0]);
      res.json(country);
    } else {
      res.json(err);
    }
  } else {
    next();
  }
  #endregion*/
}
/*
const getCountriesByContinent = async (req = request, res = response, next) => {
  // Africa Asia Americas Oceania Antarctic Europe
  res.send("continent");
};
*/
const getActivitiesByCountry = async (
  req = request,
  res = response,
  next
) => {
  const { id } = req.params
  try {
    const country = await Country.findOne({ where: { id } })
    // console.log(country.__proto__);
    const activities = await country.getTourist_activities()
    res.json(activities)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const addActivities = async (req = request, res = response, next) => {
  const { id } = req.params
  const country = await Country.findOne({ where: { id } })

  const activities = await Tourist_activity.findAll({
    where: {
      id: {
        [Op.or]: [1, 2, 3]
      }
    }
  })

  const result = await country.addTourist_activities(activities)
  res.json(result)
  try {
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  getAllCountries,
  getCountriesByName,
  getCountryById,
  getActivitiesByCountry,
  addActivities
}
