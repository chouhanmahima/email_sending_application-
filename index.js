const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv')


const PORT = 6000;

dotenv.config();

const app = express();

app.use(express.urlencoded());
app.use(express.json());


// Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com', // Replace with your provider's SMTP server
    port: 465, // Port may vary depending on your provider
    secure: true, // Use true for TLS, false for non-TLS (consult your provider)
    auth: {
        user: process.env.userEmail, // Replace with your email address
        pass: process.env.userPassword // Replace with your email password
    }
});

app.get("/", (req,res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Form</title>
        <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            width: 400px;
        }
        label {
            font-weight: bold;
        }
        input[type="email"],
        input[type="text"],
        textarea {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        textarea {
            height: 100px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        </style>
        </head>
        <body>
        
        <form action="/send-email" method="post">
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <label for="subject">Subject:</label><br>
        <input type="text" id="subject" name="subject" required><br>
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="4" required></textarea><br><br>
        <button type="submit">Send Email</button>
        </form>
        
        </body>
        </html>  
    `)
});

app.post("/send-email", (req, res) => {
    console.log(req.body);
    const mailOptions = {
        
        from: 'process.env.userEmail', // Replace with your email address
        to: req.body.email, // Replace with the recipient's email address
        subject: req.body.subject, // Replace with your desired subject
        text: req.body.message, // Plain text content
    //     html: `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Welcome Email</title>
    //         <style>
    //             body {
    //                 font-family: Arial, sans-serif;
    //                 margin: 0;
    //                 padding: 0;
    //                 background-color: #f7f7f7;
    //             }
    //             .container {
    //                 width: 100%;
    //                 max-width: 600px;
    //                 margin: 0 auto;
    //                 background-color: #ffffff;
    //                 border-radius: 8px;
    //                 overflow: hidden;
    //                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //             }
    //             .header {
    //                 background-color: #4CAF50;
    //                 color: #ffffff;
    //                 padding: 20px;
    //                 text-align: center;
    //             }
    //             .header h1 {
    //                 margin: 0;
    //             }
    //             .content {
    //                 padding: 20px;
    //                 text-align: center;
    //             }
    //             .content p {
    //                 font-size: 16px;
    //                 color: #333333;
    //             }
    //             .footer {
    //                 background-color: #f1f1f1;
    //                 color: #888888;
    //                 text-align: center;
    //                 padding: 10px;
    //                 font-size: 12px;
    //             }
    //             .footer a {
    //                 color: #4CAF50;
    //                 text-decoration: none;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <div class="container">
    //             <div class="header">
    //                 <h1>Welcome to Our Community!</h1>
    //             </div>
    //             <div class="content">
    //                 <p>Dear [User],</p>
    //                 <p>Thank you for joining us! We are thrilled to have you as part of our community. Here are some resources to get you started:</p>
    //                 <ul>
    //                     <li><a href="#">User Guide</a></li>
    //                     <li><a href="#">Community Forums</a></li>
    //                     <li><a href="#">Support Center</a></li>
    //                 </ul>
    //                 <p>If you have any questions, feel free to <a href="#">contact us</a>.</p>
    //                 <p>Best regards,<br>The [Company] Team</p>
    //             </div>
    //             <div class="footer">
    //                 <p>&copy; 2024 [Company]. All rights reserved.</p>
    //                 <p><a href="#">Unsubscribe</a></p>
    //             </div>
    //         </div>
    //     </body>
    //     </html>
        
    //     `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error(error);
        return res.status(500).send("Error sending email: " + error.message);
        } 
        else {
        console.log('Email sent: ' + info.response);
        res.send("Email Sent Successfully !")
        }
    });
    
});

app.listen(PORT, () => {
    console.log("Server is running on port", `${PORT}`);
})