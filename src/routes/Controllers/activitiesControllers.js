const { Router } = require("express");
const { createActivity, getAllActivities } = require("./controllers.js");

const router = Router();

router.get("/", async(req, res)=>{
  try {
      const activities = await getAllActivities()
      res.status(200).send(activities)
  } catch (error) {
      res.status(400).send(error)
  }
})

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  try {
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    if(!name || !difficulty || !duration || !season || !countries){
      res.status(400).send("Missing fields")
      window.location.reload()
    }else{
      res.status(200).send("Activity created successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
