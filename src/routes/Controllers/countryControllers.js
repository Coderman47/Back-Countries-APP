const { Router } = require("express");
const {
  getAllCountriesDb,
  findCountryByName,
  findCountryById,
} = require("./controllers.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;

  const allCountries = await getAllCountriesDb();
  
  try {
    if(!name){
      res.status(200).send(allCountries);
    }else{
      const findedCountry = await findCountryByName(name);

      if(!findedCountry){
        throw new Error("Country with this name not found");
      }
      res.status(200).send(findedCountry);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  
  const { id } = req.params;
  const allCountries = await getAllCountriesDb();
  const filterCountry = await findCountryById(id, allCountries);

  try {
    filterCountry ? res.status(200).send(filterCountry) : res.status(400).send("Country not found by ID");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
