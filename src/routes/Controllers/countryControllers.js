const { Router } = require("express");
const {
  getAllCountriesDb,
  findCountryById,
} = require("./controllers.js");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allCountries = await getAllCountriesDb();
  try {
    if (name) {
      const filterCountry = await allCountries.filter((country) =>
      country.name.toLowerCase().includes(name.toLowerCase())
      );
      filterCountry ? res.status(200).send(filterCountry) : res.status(400).send("That country does not exist");
    } else {
      res.status(200).send(allCountries);
    }
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/allCountries", async (req, res)=>{
  const allCountries = await getAllCountriesDb()
  res.status(200).send(allCountries)
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allCountries = await getAllCountriesDb();
    // console.log("findCountry()", allCountries)
    const filterCountries = await findCountryById(id, allCountries);
    filterCountries ? res.status(200).send(filterCountries) : res.status(400).send("Country not found by ID");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
