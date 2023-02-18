import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true, minlength: 8 },
  image: {
    type: String,
  },
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
