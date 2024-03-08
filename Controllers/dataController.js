const DataSchema = require("../Modals/dataModel")
const mongoose = require("mongoose");

const insightDataModel = mongoose.model("insight", DataSchema);
exports.getAllData = async(req,res)=>{

    const data = await insightDataModel.find();
    try{
        res.status(200).json({
            status: 'success',
            data: {
              length:data.length,
              data: data.length?data:[]
            },
            message:"Data fetch successfully "
          });

    }catch(error){
         // Check if the error is a validation error
         if (error instanceof mongoose.Error.ValidationError) {
            // Construct an object to hold precise error messages
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            // Respond with validation error messages
            res.status(400).json({ errors });
        } else {
            // Respond with generic server error
            console.error('Error saving insight:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


}