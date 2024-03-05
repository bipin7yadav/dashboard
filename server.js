const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express()
const port = 3003

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DBPASSWORD
  );
console.log(DB);
  mongoose.set("strictQuery", false);
  mongoose.connect(DB).then(() => {
    console.log("DB Connection Successful !!");
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const insightSchema = new mongoose.Schema({
  insight: {
    type: String,
    required: [true, 'Insight must be provided']
  },
  url: {
    type: String,
    required: [true, 'URL must be provided']
  },
  topic: {
    type: String,
    required: [true, 'Topic must be provided']
  },
  published: {
    type: Date,
    required: [true, 'Published date must be provided']
  },
  start_year: {
    type: Date,
    required: [true, 'Start year must be provided']
  },
  end_year: {
    type: Date,
    default: null
  },
  country: {
    type: String,
    required: [true, 'Country must be provided']
  },
  region: {
    type: String,
    required: [true, 'Region must be provided']
  },
  sector: {
    type: String,
    required: [true, 'Sector must be provided']
  },
  source: {
    type: String,
    required: [true, 'Source must be provided']
  },
  title: {
    type: String,
    required: [true, 'Title must be provided']
  },
  impact: String,
  relevance: {
    type: Number,
    required: [true, 'Relevance must be provided'],
    min: [0, 'Relevance must be greater than or equal to 0']
  },
  pestle: {
    type: String,
    required: [true, 'PESTLE must be provided']
  },
  likelihood: {
    type: Number,
    required: [true, 'Likelihood must be provided'],
    min: [0, 'Likelihood must be greater than or equal to 0']
  },
  intensity: {
    type: Number,
    required: [true, 'Intensity must be provided'],
    min: [0, 'Intensity must be greater than or equal to 0']
  },
  added: {
    type: Date,
    required: [true, 'Added date must be provided'],
    default: Date.now
  }
}
,
{
  toJSON: {virtuals:true},
  toObjects: {virtuals :true}
}
);

const insightData = mongoose.model("insight", insightSchema);


let newData = new insightData({
  "end_year": "",
  "intensity": 16,
  "sector": "Retail",
  "topic": "export",
  "insight": "European Economic Forecast - Winter 2016",
  "url": "http://ec.europa.eu/economy_finance/publications/eeip/pdf/ip020_en.pdf",
  "region": "Northern America",
  "start_year": 2016,
  "impact": "",
  "added": "December, 18 2016 03:19:44",
  "published": "January, 27 2016 00:00:00",
  "country": "United States of America",
  "relevance": 4,
  "pestle": "Economic",
  "source": "Europa",
  "title": "The renewed fall in oil prices early this year and the depreciation of the euro's exchange rate vis-à-vis the US dollar are expected to remain key determinants of both export and import prices in 2016.",
  "likelihood": 4
});

newData.save().then((doc) => {
  console.log("doc saved", doc);
}).catch(err => {
  console.log("error123: ", err);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})