const { Router } = require("express");
const {
  postActivity,
  getAllActivities,
  putAddCountryToActivity,
  getCountriesByActivity,
  getActivityById,
  deleteActivityById,
} = require("../controllers/activity.controller");

const router = Router();

router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.delete("/:id", deleteActivityById);
router.post("/", postActivity);
// /activity/:id/countries | Obtiene los paises que realizan la actividad
router.get("/:id/countries", getCountriesByActivity);
// /activity/:id/countries | Asocia paises a una actividad
router.put("/:id/countries", putAddCountryToActivity);

module.exports = router;
