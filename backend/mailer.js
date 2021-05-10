const nodemailer = require('nodemailer');

const sendEmail = (data) => {

    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    let mailOptions = {
        from: 'smtp.mailtrap.io',
        to: data.emailTo,
        subject: data.subject,
        html: data.html
    };

    transport.sendMail(mailOptions, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Register mail sent: ' + info.response);
        }
    }); 
}

module.exports = sendEmail;