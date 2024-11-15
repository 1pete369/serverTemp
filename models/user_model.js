const mongoose = require("mongoose")

// const user = new mongoose.Schema({
//   uid: String,
//   email: String,
//   displayName: String,
//   username: String,
//   photoURL: String,
//   provider: String,
//   isEmailVerified: Boolean,
//   createdAt: Date,
//   lastLoginAt: Date,
//   timezone: String,
//   countryCode: String,
//   customData: {
//     preferences: String,
//     streak: Number,
//     goals: [String],
//     days: [{ type: mongoose.Schema.Types.ObjectId, ref: "day_model" }]
//   }
// })

const user = new mongoose.Schema({
  uid: String,
  personalInfo : {
    email : String,
    displayName : String,
    username : String,
    photoURL : String,
    provider : String,
    isEmailVerified : Boolean
  },
  customData : {
    timezone : {
      timezoneName: String,
      countryCode : String
    },
    preferences : {
      notification : Boolean
    },
    streak : Number,
    goals : [String],
    days : [ { type : mongoose.Schema.Types.ObjectId , ref : "day_model" }]
  },
  updates : {
    profileUpdatedAt : Date
  },
  timings : {
    createdAt : Date,
    lastLoginAt : Date
  }
})

// export type MainUserObject = {
//   uid: string,
//   personalInfo : {
//     email : string,
//     displayName : string,
//     username : string,
//     photoURL : string,
//     provider : string,
//     isEmailVerified : boolean
//   },
//   customData : {
//     timezone : {
//       timezoneName: string,
//       countryCode : string
//     },
//     preferences : {
//       notification : boolean
//     },
//     streak : number,
//     goals : string[],
//     days : string []
//   },
//   updates : {
//     profileUpdatedAt : Date
//   },
//   timings : {
//     createdAt : string,
//     lastLoginAt : string
//   }
// }

module.exports = mongoose.model("user_model", user)
