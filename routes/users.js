const express = require("express")

const user = require("../models/user_model")

const { default: mongoose } = require("mongoose")

const router = express.Router()

router.get("/", (req, res) => {
  res.json({ message: "Hello bro" })
})

router.post("/create-user", async (req, res) => {
  const mainUserObject = req.body.user
  try {
    const newUser = new user(mainUserObject)
    await newUser.save()
    res.json({ message: "user Added", user: newUser })
  } catch (err) {
    res.json({ message: err.message })
  }
})

router.get("/check-user/:id", async (req, res) => {
  const uid = req.params.id
  try {
    console.log("Check user called")
    const userExistedOrNot = await user.find({ uid: uid })
    if (userExistedOrNot.length > 0) {
      res.json({ message: "user already exists", exist: true })
    } else {
      res.json({ message: "user not existed", exist: false })
    }
  } catch (err) {
    res.json({ message: err.message })
  }
})

router.get("/fetch-user/:id", async (req, res) => {
  const uid = req.params.id
  try {
    const mainUserObject = await user.findOne({ uid: uid })
    res.json({ userObject: mainUserObject })
  } catch (err) {
    res.json({ message: err.message })
  }
})

router.patch("/update-profile/:id", async (req, res) => {
  const uid = req.params.id;

  console.log("update fields called");
  console.log("Request Body:", req.body);

  // Access username and name from req.body.updateFields
  const { username, name } = req.body.updateFields || {};

  const updateFieldsObj = {};
  if (username) updateFieldsObj.username = username;
  if (name) updateFieldsObj.displayName = name;

  try {
    const userObject = await user.findOneAndUpdate(
      { uid },
      { $set: updateFieldsObj },
      { new: true }
    );

    if (!userObject) {
      return res.status(404).json({ message: "User not found", flag: false });
    }

    res.json({ userObject, flag: true });
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "An error occurred while updating the profile", flag: false });
  }
});




  // if (!updateFields) {
  //   return res.status(400).json({ message: "updateFields is required", flag: false });
  // }

  // const { username, name } = updateFields; // Destructure username and name
  // console.log(username, name);

  // // Prepare the updateFields object for the update query
  // const updateFieldsObj = {};
  // if (username) updateFieldsObj.username = username;
  // if (name) updateFieldsObj.displayName = name;

  // try {
  //   // Update the user in the database
  //   const userObject = await user.findOneAndUpdate(
  //     { uid },
  //     { $set: updateFieldsObj },
  //     { new: true }
  //   );
    
  //   // Respond with the updated user object
  //   res.json({ userObject, flag: true });
  // } catch (err) {
  //   // Handle any errors
  //   res.json({ message: err.message, flag: false });
  // }


router.get("/check-username/:id", async (req, res) => {
  const username = req.params.id
  console.log("Check username called", username)
  try {
    const users = await user.find()
    console.log(users)
    const isAlreadyExist = users.filter((user) => user.username === username)
    console.log(isAlreadyExist)
    if (isAlreadyExist.length > 0) {
      res.json({ message: "userName already existed", exist: true })
    } else {
      res.json({ message: "userName not existed", exist: false })
    }
  } catch (err) {
    res.json({ message: err.message })
  }
})

router.post("/push-day-id/:id", async (req, res) => {

    console.log("Push day called in users")

  const userId = req.params.id
  const { dayId } = req.body

  const dayObjectId = new mongoose.Types.ObjectId(dayId);

  try {
    const updatedUser = await user.findOneAndUpdate(
      { uid: userId },
      { $push: { "customData.days": dayObjectId } },
      { new : true }
    )
    res.json({ updatedUser })
  } catch (err) {
    res.json({ Error: err })
  }
})


router.get('/get-full-user/:id',async(req,res)=>{
    const uid = req.params.id
    console.log("Getuser id",uid)
    try{
        const fullUserObject = await user.findOne({uid }).populate({
                path: 'customData.days',
                populate : {
                    path: "todos"
                }
            }).exec();
        res.json({ message:"Populated user Object", fullUserObject  })
    }catch(err){
        res.json({ Error : err })
    }
})


module.exports = router
