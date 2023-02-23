import dbConnect from "lib/dbConnect"
import validateEmail from "lib/regex/validateEmail"
import PasswordReset from "model/PasswordReset"
import User from "model/User"
import nodemailer from "nodemailer"
const smtpTransport = require("nodemailer-smtp-transport")

import * as Sentry from "@sentry/nextjs"

interface PasswordResetPayload {
  email: string
}

const i18nMail = {
  "en-US": {
    subject: "password reset request",
    message:
      "Looks like are trying to reset your password, if that is true please proceed with this link",
    link: "Reset password",
    mistake: "If you did not, please ignore this message",
    automatic: "This email was automatically generated, please do not reply.",
  },
  "pt-BR": {
    subject: "solicitação de alteração de senha",
    message:
      "Parece que você está tentando alterar sua senha, se este for o caso por favor acesse este link",
    link: "Alterar senha",
    mistake:
      "Caso não tenha feito a solicitação, por favor ignore esta mensagem.",
    automatic: "Este email foi gerado automaticamente, por favor não responda.",
  },
}

export default async function handler(req: any, res: any) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "POST":
      try {
        const { email } = JSON.parse(req.body) as PasswordResetPayload
        let locale = (req.headers["accept-language"]?.split(",")[0] ||
          "pt-BR") as keyof typeof i18nMail

        locale = Object.keys(i18nMail).includes(locale) ? locale : "pt-BR"

        if (!validateEmail(email)) {
          throw new Error("Invalid email format")
        }

        const user = await User.findOne({ email })
        if (user) {
          const { id } = await PasswordReset.create({ userId: user.id })
          res.status(201).json({ success: true })

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

          await transporter
            .sendMail({
              from: "Dice Overdrive - Support <dougbyte@diceoverdrive.com>",
              to: email,
              subject: `Dice Overdrive ${i18nMail[locale].subject}`,
              html: `
          <p>
            ${i18nMail[locale].message}
            <br/>
            <a href="${req.headers.referer}?confirmationCode=${id}&isReset=true">${i18nMail[locale].link}</a>
          </p>
          <small><strong>${i18nMail[locale].mistake}</strong></small>
          <br />
          <small>${i18nMail[locale].automatic}</small>
          `,
            })
            .then((res) => console.log(res))
            .catch((mailError) => {
              Sentry.captureException(mailError)
              console.log(
                "welp, no idea what to do if this fails, guess user is destined not use use the app :/"
              )
            })
        }
      } catch (error: any) {
        const { message } = error
        res.status(400).json({ success: false, message })
      }
      break
    default:
      res.status(400).json({ success: false, message: "Invalid method" })
      break
  }
}
