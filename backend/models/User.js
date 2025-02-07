import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  botConfig: {
    name: String,
    welcomeMessage: String,
    faqResponses: [{ question: String, answer: String }],
  },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

export default mongoose.model("User", userSchema)

