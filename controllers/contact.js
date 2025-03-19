
const Contact = require("../model/contact");
const sendEmail = require("../Tools/sendEmail");
const fs = require("fs");
const path = require('path');

exports.contact = async (req, res) => {
  try {
    const { name, email, phoneno, message } = req.body;

    if (!name || !email || !phoneno || !message) {
      return res.status(400).send({
        success: false,
        message: "All fields are required.",
      });
    }

    
    const userCreate = await Contact.create({ name, email, phoneno, message });

    
    const templatePath = path.join(__dirname, '../Templates/contactTemplate.html');
    if (!fs.existsSync(templatePath)) {
      return res.status(500).send({
        success: false,
        message: "Contact template not found.",
      });
    }
    const contactTemplate = fs.readFileSync(templatePath, 'utf8');

    
    const subject = "Welcome to LMS";
    const text = `Hi ${name}, your response has been recorded successfully.`;
    const html = contactTemplate.replace("{{name}}", name);

    const isEmailSent = await sendEmail(email, subject, text, html);
    if (!isEmailSent) {
      return res.status(500).send({
        success: false,
        message: "Failed to send email.",
      });
    }

    res.status(200).send({
      success: true,
      data: userCreate,
      message: "Message sent successfully.",
    });

  } catch (error) {
    console.error("Error sending contact message:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error sending contact message.",
    });
  }
};
