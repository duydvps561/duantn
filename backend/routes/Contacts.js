const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

router.get('/', async function(req, res, next) {
  try {
    const contacts = await Contact.find(); 
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, email, phone, contact } = req.body;

    const newContact = new Contact({ Name: name, email, phone, contact });
    await newContact.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'acecinema.movies@gmail.com',
        pass: 'kgrv xnqt iveq lwyy' 
      }
    });

    const mailOptions = {
        from: 'acecinema.movies@gmail.com',
        to: email,
        subject: 'Thông báo từ ACE Cinema',
        html: `
          <html>
            <body>
              <h1>Thông báo từ ACE Cinema</h1>
              <p>Chúng tôi đã nhận được góp ý của quý khách. Xin chân thành cảm ơn!</p>
              <p>Để biết thêm thông tin, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:canalisclup@gmail.com">canalisclup@gmail.com</a>.</p>
              <p>Trân trọng,</p>
              <p><strong>ACE Cinema Team</strong></p>
            </body>
          </html>`
      };

    await transporter.sendMail(mailOptions);

    res.status(201).send({ message: 'Contact saved and email sent successfully' });
  } catch (err) {
    console.error('Error occurred while processing the request:', err); // In ra lỗi chi tiết hơn
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
