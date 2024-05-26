const express = require("express");
const nodemailer = require('nodemailer');

const app = express();
app.use(express.urlencoded());


const transporter = nodemailer.createTransport({
    host: '0.0.0.0', // Replace with your provider's SMTP server
    port: 1025, // Port may vary depending on your provider
    secure: false, // Use true for TLS, false for non-TLS (consult your provider)
});

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Form</title>
        <style>
        body {
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0;
        }
        form {
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 8px;
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
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            margin-top: 5px;
            margin-bottom: 15px;
        }
        textarea {
            height: 100px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            border: none;
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
        from: 'developer@gmail.com', // Replace with your email address
        to: req.body.email, // Replace with the recipient's email address
        subject: req.body.subject, // Replace with your desired subject
        text: req.body.message, // Plain text content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Email Sent Successfully !")
        }
    });
})

const PORT = 6000;
app.listen(PORT, () => {
    console.log("Server is running at " + PORT);
})