import dbConnect from "lib/dbConnect"
import ConfirmationEmail from "model/ConfirmationEmail"
import User from "model/User"
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

interface ConfirmationEmailPayload {
  email: string
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
        const { email } = JSON.parse(req.body) as ConfirmationEmailPayload
        const user = await User.findOne({ email })
        if (user)
          throw new Error(
            "This email is already in use. Have you forgotten your password?"
          )

        const confirmationEmail = await ConfirmationEmail.create({ email })
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
          },
        })

        transporter
          .sendMail({
            from: {
              name: "Dice Overdrive - Support",
              address: "dougbyte@diceoverdrive.com",
            },
            to: email,
            subject: "Dice Overdrive email confirmation",
            html: `
          <p>
            Thanks for signup to DiceOverdrive, only one more step so you can charge your rolls!!
            <br/>
            <a href="${req.headers.referer}?confirmationCode=${confirmationEmail.id}">Create a password</a>
          </p>
          <small>If you did not, please ignore this message</small>
          `,
          })
          .catch((mailError) => {
            console.log(
              "welp, no idea what to do if this fails, guess user is destined not use use the app :/"
            )
          })

        res.status(201).json({ success: true })
      } catch (error: any) {
        let message = error.message
        if (error.code === 11000) {
          message =
            "This email is already registered. Please check your inbox/spam for confirmation"
        }
        res.status(400).json({ success: false, message })
      }
      break
    default:
      res.status(400).json({ success: false, message: "Invalid method" })
      break
  }
}
