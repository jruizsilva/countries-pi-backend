const { Op } = require('sequelize')
const { Country } = require('../database/db')

const getCountriesDB = async (
  page = 0,
  continentName,
  sort,
  superpoblados
) => {
  // Filter
  let where = {}
  if (continentName)
    where.continent = {
      [Op.iLike]: `%${continentName}%`
    }
  if (superpoblados)
    where.population = {
      [Op.gt]: 10000000
    }

  // Sort
  let order
  if (sort === 'population-asc') order = [['population', 'ASC']]
  if (sort === 'population-desc') order = [['population', 'DESC']]
  if (sort === 'alfhabet-asc') order = [['name', 'ASC']]
  if (sort === 'alfhabet-desc') order = [['name', 'DESC']]

  let limit = parseInt(page) === 0 ? 9 : 10
  let offset = parseInt(page) === 0 ? 0 : page * limit - 1
  if (isNaN(page) || page < 0) page = 0

  const count = await Country.count()
  const totalPages = Math.ceil(count / limit)
  const countries = await Country.findAll({
    // attributes: ["id", "name", "flag_image", "continent"],
    limit,
    offset,
    where,
    order
  })
  return { results: countries, count, totalPages }
}

module.exports = { getCountriesDB }
