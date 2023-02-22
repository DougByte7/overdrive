import mongoose from "mongoose"

const ConfirmationEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
})

const ConfirmationEmail =
  mongoose.models.ConfirmationEmail ||
  mongoose.model("ConfirmationEmail", ConfirmationEmailSchema)

export default ConfirmationEmail
