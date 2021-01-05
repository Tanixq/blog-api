const nodemailer = require('nodemailer')
const { GMAIL_ID, GMAIL_PASS } = require('../../../config/config') 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_ID,
        pass: GMAIL_PASS
    }
})  

function sendEmail (toEmail, otp, type, subject) {
    const mailBody = {
        type: `${type}`,
        to: `${toEmail}`,
        subject: `${subject}`,
        text: `Please confirm your email opt is ${otp}`
    }  

    transporter.sendMail(mailBody, function (error, info) {
        if (error) {
            console.log(error)  
        } else {
            console.log('Email sent: ' + `${toEmail}`)  
        }
    })  
}

module.exports = { sendEmail }  
