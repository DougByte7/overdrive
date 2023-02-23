import dbConnect from "lib/dbConnect"
import validateEmail from "lib/regex/validateEmail"
import ConfirmationEmail from "model/ConfirmationEmail"
import User from "model/User"
import nodemailer from "nodemailer"
const smtpTransport = require("nodemailer-smtp-transport")
import * as Sentry from "@sentry/nextjs"

interface ConfirmationEmailPayload {
  email: string
  name: string
}

const i18nMail = {
  "en-US": {
    subject: "email confirmation",
    message:
      "Thanks for signup to Dice Overdrive, only one more step so you can charge your rolls!!",
    link: "Create a password",
    mistake: "If you did not, please ignore this message",
    automatic: "This email was automatically generated, please do not reply.",
  },
  "pt-BR": {
    subject: "confimação de email",
    message:
      "Obrigado por se cadastrar na Dice Overdrive, apenas mais um passo para que você possa jogar!!",
    link: "Criar senha",
    mistake: "Caso não tenha, por favor ignore esta mensagem.",
    automatic: "Este email foi gerado automaticamente, por favor não responda.",
  },
}

export default async function handler(req: any, res: any) {
  const { method } = req
  let locale = (req.headers["accept-language"]?.split(",")[0] ||
    "pt-BR") as keyof typeof i18nMail

  locale = Object.keys(i18nMail).includes(locale) ? locale : "pt-BR"

  await dbConnect()

  switch (method) {
    case "POST":
      try {
        const { email, name } = JSON.parse(req.body) as ConfirmationEmailPayload

        if (!name || name.length < 2 || name.length > 30) {
          throw new Error("Display name must have from 3 to 30 characters")
        }

        if (!validateEmail(email)) {
          throw new Error("Invalid email format")
        }

        const user = await User.findOne({ email })
        if (user)
          throw new Error(
            "This email is already in use. Have you forgotten your password?"
          )

        const confirmationEmail = await ConfirmationEmail.create({
          email,
          name,
        })

        const transporter = nodemailer.createTransport(
          smtpTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            greetingTimeout: 1000 * 60 * 5,
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASSWORD,
            },
          })
        )

        transporter.verify(function (error, success) {
          if (error) {
            console.log(error)
            Sentry.captureException(error)
          } else {
            console.log("Server is ready to take our messages", success)
          }
        })

        const mailError = await transporter.sendMail({
          from: {
            name: "Dice Overdrive - Support",
            address: process.env.GMAIL_USER!,
          },
          to: email,
          subject: `Dice Overdrive ${i18nMail[locale].subject}`,
          html: `
          <p>
            ${i18nMail[locale].message}
            <br/>
            <a href="${req.headers.referer}?confirmationCode=${confirmationEmail.id}">${i18nMail[locale].link}</a>
          </p>
          <small><strong>${i18nMail[locale].mistake}</strong></small>
          <br />
          <small>${i18nMail[locale].automatic}</small>
          `,
        })

        if (mailError) {
          Sentry.captureException(mailError)
          console.log(
            "welp, no idea what to do if this fails, guess user is destined not use use the app :/",
            mailError
          )
        }

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
