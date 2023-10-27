const { Op } = require('sequelize')
const { request, response } = require('express')
const { Country, Tourist_activity } = require('../database/db')

const getAllActivities = async (req = request, res = response) => {
  try {
    const activities = await Tourist_activity.findAll()
    res.json(activities)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const postActivity = async (req = request, res = response) => {
  try {
    const touristActivity = await Tourist_activity.create(req.body)
    res.json(touristActivity)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const putAddCountryToActivity = async (
  req = request,
  res = response
) => {
  const { countryId } = req.body
  const { id } = req.params
  const country = await Country.findOne({
    where: {
      id: countryId
    }
  })

  const activity = await Tourist_activity.findByPk(id)
  const result = await activity.addCountry(country)
  res.json(result)
  try {
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const getCountriesByActivity = async (
  req = request,
  res = response
) => {
  const { id } = req.params
  let { page = 0, sort, continent } = req.query
  // Where
  let where = {}
  if (continent)
    where.continent = {
      [Op.iLike]: `%${continent}%`
    }

  const actividad = await Tourist_activity.findByPk(id)
  // Sort
  let order
  if (sort === 'population-asc') order = [['population', 'ASC']]
  if (sort === 'population-desc') order = [['population', 'DESC']]
  if (sort === 'alfhabet-asc') order = [['name', 'ASC']]
  if (sort === 'alfhabet-desc') order = [['name', 'DESC']]

  let limit = parseInt(page) === 0 ? 9 : 10
  let offset = parseInt(page) === 0 ? 0 : page * limit - 1
  if (isNaN(page) || page < 0) page = 0

  const countries = await actividad.getCountries({
    limit,
    offset,
    order,
    where
  })
  res.json(countries)
}

const getActivityById = async (req = request, res = response) => {
  const { id } = req.params
  try {
    const actividad = await Tourist_activity.findByPk(id)
    res.json(actividad)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

const deleteActivityById = async (req = request, res = response) => {
  const { id } = req.params
  try {
    const result = await Tourist_activity.destroy({ where: { id } })
    res.json(result)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

module.exports = {
  getAllActivities,
  postActivity,
  putAddCountryToActivity,
  getCountriesByActivity,
  getActivityById,
  deleteActivityById
}
