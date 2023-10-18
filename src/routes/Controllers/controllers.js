const axios = require("axios");
const { Country, Activities } = require("../../db.js");

const createCountriesToDb = async () => {
  const apiInfo = await axios.get("https://restcountries.com/v3/all");
  // console.log(apiInfo.data)
  const data = apiInfo? await apiInfo.data.map((el) => {
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
  }) : console.log("Loading countries api");

  data.forEach(async(country) => {
    await Country.findOrCreate({
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
  
  return allCountries;
};

const getAllActivitiesDb = async () => {
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
  
  return data;
};

const findCountryByName = async(name) => {
    name = name.trim();
    name = name[0].toUpperCase() + name.toLowerCase().slice(1)

    const finded = await Country.findOne({
      where: {
        name : name
      }
    })

    return finded;
}
const findCountryById = async (id, countries) => {
  return await countries.find(
    (country) => country.id.toLowerCase() === id.toLowerCase());
};

const createActivity = async (name, difficulty, duration, season, paises) => {
  let existingActivity = await Activities.findOne({
    where: {
      name: name
    }
    
  });

  if(existingActivity){
    throw new Error("Activity has already been created");
  }else{
    const newActivity = await Activities.create({
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
  
    await newActivity.addCountry(countries);
  }
};

module.exports = {
  getAllCountriesDb,
  getAllActivitiesDb,
  findCountryByName,
  findCountryById,
  createCountriesToDb,
  createActivity,
};
