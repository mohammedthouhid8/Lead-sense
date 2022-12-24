//TASK-2 Creating User MODEL //
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const monoosePaginate = require("mongoose-paginate-v2");

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
    },
    phone: {
        type: Number,
        required: [true, "Please enter phone Number"],
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps : true,
    }
);

// Add mongoose peginate plug-in
userSchema.plugin(monoosePaginate);
// Exporting userSchema Model
module.exports = mongoose.model("user", userSchema)
