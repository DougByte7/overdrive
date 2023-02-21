import dbConnect from "lib/dbConnect"
import ConfirmationEmail from "model/ConfirmationEmail"
import User from "model/User"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

interface RegisterPayload {
  confirmationCode?: string
  password?: string
  name?: string
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
        const { confirmationCode, password } = JSON.parse(
          req.body
        ) as RegisterPayload

        if (!password || password.length < 8 || password.length > 64) {
          throw new Error("Password must have from 8 to 64 characters")
        }

        if (!confirmationCode) {
          throw new Error("Invalid confirmation code")
        }

        const { email, name } = await ConfirmationEmail.findById(
          confirmationCode
        ).catch((error) => {
          console.log(error)

          res.status(400).json({
            success: false,
            message: "Your confirmation code has expired.",
          })
        })

        const hashedPassword = await bcrypt.hash(password, 12)

        await User.create({
          email,
          hashedPassword,
          name,
        })

        // send email here

        res.status(201).json({ success: true, email })
      } catch (error: any) {
        res.status(400).json({ success: false, message: error.message })
      }
      break
    default:
      res.status(400).json({ success: false, message: "Invalid method" })
      break
  }
}
