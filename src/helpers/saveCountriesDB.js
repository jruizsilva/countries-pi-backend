const { Country } = require('../database/db')

const saveCountriesDB = async (countries) => {
  const promisesArr = countries.map((country) =>
    Country.create(country)
  )
  try {
    const responses = await Promise.allSettled(promisesArr)
  } catch (error) {
    console.log(error)
  }
}
module.exports = { saveCountriesDB }
