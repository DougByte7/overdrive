import mongoose from "mongoose"

const PasswordResetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
})

const PasswordReset =
  mongoose.models.PasswordReset ||
  mongoose.model("PasswordReset", PasswordResetSchema)

export default PasswordReset
