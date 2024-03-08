
const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DataSchema = require("./Modals/dataModel")
const app = express()
const port = 3003
const jsonData = require("./Data/data.json");
const dataRoute = require("./Routes/dataRoute")

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DBPASSWORD
  );
  mongoose.set("strictQuery", false);
  mongoose.connect(DB).then(() => {
    console.log("DB Connection Successful !!");
    insert()
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/getData',dataRoute)


const insightDataModel = mongoose.model("insight", DataSchema);




// let newData = new insightData(JSON.stringify(jsonData));

const insert= async()=>{
  console.log('====================================');
  console.log("DELETING DATA OLD DATA");
  console.log('====================================');
  await insightDataModel.deleteMany()
  console.log('====================================');
  console.log("INSERTING FRESH DATA");
  console.log('====================================');
  await insightDataModel.create(jsonData)

}
// newData.save().then((doc) => {
//   console.log("doc saved", doc);
// }).catch(err => {
//   console.log("error123: ", err);
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})