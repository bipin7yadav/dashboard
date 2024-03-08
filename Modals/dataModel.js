const mongoose = require("mongoose");
const dataModel = new mongoose.Schema({
    insight: {
      type: String,
      default:""
    },
    url: {
      type: String,
    },
    topic: {
      type: String,
    },
    published: {
      type: Date,
      default:"January, 08 2017 00:50:56"
    },
    start_year: {
      type: Date,
      default:"January, 08 2017 00:50:56"
    },
    end_year: {
      type: Date,
      default:"January, 08 2023 00:50:56"
    },
    country: {
      type: String,
      default:"India"
    },
    region: {
      type: String,
    },
    sector: {
      type: String,
    },
    source: {
      type: String,
    },
    title: {
      type: String
    },
    impact: String,
    relevance: {
      type: Number,
      min: [0, 'Relevance must be greater than or equal to 0']
    },
    pestle: {
      type: String,
    },
    likelihood: {
      type: Number,
      min: [0, 'Likelihood must be greater than or equal to 0']
    },
    intensity: {
      type: Number,
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

  dataModel.pre("save", function(next) {
    // Iterate over the schema paths
    this.schema.eachPath((path, schemaType) => {
        // Check if the current path has a default value defined
        if (schemaType.options.default !== undefined) {
            // Check if the field is set to null or undefined
            if (this[path] === null || this[path] === "" || this[path] === undefined) {
                // Apply the default value
                this[path] = schemaType.options.default;
            }
        }
    });
    next();
});

  module.exports= dataModel