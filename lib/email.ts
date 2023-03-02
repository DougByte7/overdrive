import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"

export default async function sendEmail(
  header: {
    from: string
    to: string
    subject: string
  },
  message: string
) {
  const { from, to, subject } = header
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

  transporter.verify((error) => {
    if (error) {
      throw error
    } else {
      console.log("transporter ready")

      return transporter
        .sendMail({
          from,
          to,
          subject,
          html: message,
        })
        .then(() => transporter.close())
        .catch((mailError) => {
          throw mailError
        })
    }
  })
}
