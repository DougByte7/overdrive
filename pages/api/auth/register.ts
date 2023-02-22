import dbConnect from "lib/dbConnect"
import ConfirmationEmail from "model/ConfirmationEmail"
import User from "model/User"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import PasswordReset from "model/PasswordReset"

interface RegisterPayload {
  confirmationCode?: string
  password?: string
  name?: string
  isReset?: "true" | "false"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "POST":
      try {
        const { confirmationCode, password, isReset } = JSON.parse(
          req.body
        ) as RegisterPayload

        if (!password || password.length < 8 || password.length > 64) {
          throw new Error("Password must have from 8 to 64 characters")
        }

        if (!confirmationCode) {
          throw new Error("Código de confirmação inválido")
        }

        let userEmail = ""

        if (isReset === "true") {
          const hashedPassword = await bcrypt.hash(password, 12)
          const passwordReset = await PasswordReset.findById(confirmationCode)

          if (!passwordReset) {
            throw new Error("Seu código de redefinição expirou")
          }

          const user = await User.findByIdAndUpdate(passwordReset.userId, {
            hashedPassword,
          })
          userEmail = user.email

          await PasswordReset.findByIdAndDelete(confirmationCode)
        } else {
          const confirmationEmail = await ConfirmationEmail.findById(
            confirmationCode
          )

          if (!confirmationEmail) {
            throw new Error("Seu código de confirmação expirou.")
          }

          userEmail = confirmationEmail.email
          const hashedPassword = await bcrypt.hash(password, 12)

          await User.create({
            name: confirmationEmail.name,
            email: confirmationEmail.email,
            hashedPassword,
          })

          await ConfirmationEmail.findByIdAndDelete(confirmationCode)
        }

        // send email here

        res.status(201).json({ success: true, email: userEmail })
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message })
      }
      break
    default:
      res.status(400).json({ success: false, message: "Invalid method" })
      break
  }
}
