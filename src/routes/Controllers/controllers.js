const axios = require("axios");
const { Country, Activities } = require("../../db.js");

const createCountriesToDb = async () => {
  const apiInfo = await axios.get("https://restcountries.com/v3/all");
  // console.log(apiInfo.data)
  const data = await apiInfo.data.map((el) => {
    return {
      id: el.cca3,
      name: el.name.common,
      continent: el.region,
      capital: el.capital ? el.capital[0] : "x",
      subregion: el.subregion ? el.subregion : "x",
      area: el.area,
      population: el.population,
      flags: el.flags[1],
    };
  });

  data.forEach((country) => {
    Country.findOrCreate({
      where: {
        id: country.id,
        name: country.name,
        continent: country.continent,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
        flags: country.flags,
      },
      default:{

      }
    });
  });
};

const getAllCountriesDb = async () => {
  const allCountries = await Country.findAll({
   
    include: [
      {
        model: Activities,
        attributes: ["name", "difficulty", "duration", "season"],
      },
    ],
  });
  // console.log("hellouuuuu",allCountries)
  return allCountries;
};

const getAllActivities = async () => {
  const data = await Activities.findAll({
    include: [
      {
        model: Country,
        attributes: ["name"],
        through: {
          attributes: {
            exclude: ["createdAt", "updateAt"],
          },
        },
      },
    ],
  });
  // console.log("getAllActivities", data)
  return data;
};

const findCountryById = (id, countries) => {
  const filterCountry = countries.find(
    (country) => country.id.toLowerCase() === id.toLowerCase());
  // console.log("soy el find()" , filterCountry)
  if (!filterCountry) {
    throw new Error("A country with that ID was not found");
  }
  return filterCountry;
};

const createActivity = async (name, difficulty, duration, season, paises) => {
  let newActivity = await Activities.create({
    name,
    difficulty,
    duration,
    season,
  });
  const countries = await Country.findAll({
    where: {
      name: paises,
    },
  });
  console.log(countries)
  newActivity.addCountry(countries);
};

module.exports = {
  getAllCountriesDb,
  getAllActivities,
  findCountryById,
  createCountriesToDb,
  createActivity,
};
