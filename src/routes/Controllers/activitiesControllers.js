const { Router } = require("express");
const { createActivity, getAllActivitiesDb } = require("./controllers.js");

const router = Router();

router.get("/", async(req, res)=>{
  const activities = await getAllActivitiesDb()

  try {
    if(activities.length === 0) throw new Error("No activities created.");
    
    res.status(200).send(activities) 
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  
  try {
    if(!name || !difficulty || !duration || !season || !countries){
      res.status(400).send("Missing fields");
    }else{
      await createActivity(
          name,
          difficulty,
          duration,
          season,
          countries,
          res
          );
  
      res.status(200).send("Activity created successfully");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
