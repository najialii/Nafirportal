const nodemailer = require("nodemailer");

const sendMail = (email,emailToken) => {
    const transporter = nodemailer.createTransport({
        // service: "gmail",
        host: "smtp.ethereal.email",
        port: 587, 
        secure: false, 
        tls: {
            rejectUnauthorized: false
        }
,        
        auth: {
      user: 'kevon.baumbach@ethereal.email',
        pass: 'aWszC345dNM2ErBpDQ'
        },
    });

    const mailOptions = {
        from: '"Nafir Portal" <kevon.baumbach@ethereal.email>',
        to: `${email}`,
        subject: 'Please verify your email...',
        html:`<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://localhost:5173/verify-email?emailToken=${emailToken}">Click here to verify</a>
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else { 
          console.log('Email sent: ' + info.response);
        }
    });
}
  
module.exports = sendMail;