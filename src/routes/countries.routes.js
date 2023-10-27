const { Router } = require("express");
const {
  getAllCountries,
  getCountryById,
  getCountriesByName,
  getActivitiesByCountry,
  addActivities,
} = require("../controllers/countries.controller");

const router = Router();

router.get("/:id", getCountryById);
router.put("/:id/activities", addActivities);
router.get("/:id/activities", getActivitiesByCountry);
router.get("/", getCountriesByName);
router.get("/continent/:name", getAllCountries);
router.get("/", getAllCountries);

module.exports = router;
