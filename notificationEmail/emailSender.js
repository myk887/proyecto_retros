const nodemailer = require("nodemailer")

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SENDER_EMAIL } = process.env

let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
})


const accountConfirmationEmail = async ({ sendTo, code }) => {
  await transporter.sendMail({
    from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
    to: sendTo,
    subject: "Confirm your account",
    html: `<p>Click <a href="http://localhost:4000/confirmation/${code}">here</a> to confirm your account</p>`
  })
}

const accountRecoverCodeEmail = async ({ sendTo, code }) => {
  await transporter.sendMail({
    from: `${SENDER_EMAIL} <${SENDER_EMAIL}>`,
    to: sendTo,
    subject: "Confirm your account",
    html: `<p>Click <a href="http://localhost:3000/users/recover/:${code}">here</a> to recover password</p>`
  })
}

module.exports = {
  accountConfirmationEmail,
  accountRecoverCodeEmail
}