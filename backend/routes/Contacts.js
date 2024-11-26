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
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
        from: 'acecinema.movies@gmail.com',
        to: email,
        subject: 'Thông báo từ ACE Cinema',
        html: `
          <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin: 20px auto; padding: 20px; border: 1px solid #dddddd;">
                <tr>
                  <td style="text-align: center; padding-bottom: 20px;">
                    <img src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/466577385_122127115214398570_1390939337045666896_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t2-aiIAf07EQ7kNvgHwiD9J&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=A3Ky9-EYGGNgFPDdZlp_A6R&oh=00_AYB2EnlQnHnWO6W8G6qAT99z99m4_NP-rtmFZAy9mofPZg&oe=673F780E" alt="ACE Cinema Logo" style="max-width: 150px;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 20px; text-align: left;">
                    <h2 style="color: #333;">Xin chào quý khách,</h2>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                      Chúng tôi đã nhận được góp ý của quý khách. Xin chân thành cảm ơn sự quan tâm và đồng hành của quý khách cùng ACE Cinema.
                    </p>
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">
                      Để biết thêm thông tin, vui lòng liên hệ với chúng tôi qua email: 
                      <a href="mailto:acecinema.movies@gmail.com" style="color: #1e88e5; text-decoration: none;">acecinema.movies@gmail.com</a>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; text-align: left; border-top: 1px solid #dddddd;">
                    <p style="color: #555; font-size: 14px; line-height: 1.6;">Trân trọng,</p>
                    <p style="color: #333; font-weight: bold; font-size: 16px; margin: 0;">ACE Cinema Team</p>
                    <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Hotline: 123-456-789</p>
                    <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Website: <a href="https://acecinema.com" style="color: #1e88e5; text-decoration: none;">www.acecinema.com</a></p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `
      };

    await transporter.sendMail(mailOptions);

    res.status(201).send({ message: 'Contact saved and email sent successfully' });
  } catch (err) {
    console.error('Error occurred while processing the request:', err); // In ra lỗi chi tiết hơn
    res.status(500).send({ error: err.message });
  }
});
router.post('/reply/:id', async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).send({ error: 'Contact not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'acecinema.movies@gmail.com',
        pass: 'rimy nniy xgcv zkxe'
      }
    });

    const mailOptions = {
      from: 'acecinema.movies@gmail.com',
      to: contact.email,
      subject: 'Phản hồi từ ACE Cinema',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin: 20px auto; padding: 20px; border: 1px solid #dddddd;">
              <tr>
                <td style="text-align: center; padding-bottom: 20px;">
                  <img src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/466577385_122127115214398570_1390939337045666896_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t2-aiIAf07EQ7kNvgHwiD9J&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=A3Ky9-EYGGNgFPDdZlp_A6R&oh=00_AYB2EnlQnHnWO6W8G6qAT99z99m4_NP-rtmFZAy9mofPZg&oe=673F780E" alt="ACE Cinema Logo" style="max-width: 150px;">
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 20px; text-align: left;">
                  <h2 style="color: #333;">Xin chào quý khách,</h2>
                  <p style="color: #555; font-size: 16px; line-height: 1.6;">
                    Chúng tôi xin phản hồi đến góp ý của quý khách:
                  </p>
                  <blockquote style="color: #333; font-style: italic; border-left: 4px solid #1e88e5; padding-left: 10px; margin: 10px 0;">
                  ${replyMessage}
                  </blockquote>
                  <p style="color: #555; font-size: 16px; line-height: 1.6;">
                    Rất mong nhận được sự góp ý và ủng hộ từ quý khách trong tương lai.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: left; border-top: 1px solid #dddddd;">
                  <p style="color: #555; font-size: 14px; line-height: 1.6;">Trân trọng,</p>
                  <p style="color: #333; font-weight: bold; font-size: 16px; margin: 0;">ACE Cinema Team</p>
                  <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Hotline: 123-456-789</p>
                  <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Website: <a href="https://acecinema.com" style="color: #1e88e5; text-decoration: none;">www.acecinema.com</a></p>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `
    };

    await transporter.sendMail(mailOptions);

    // Cập nhật trạng thái
    contact.trangthai = 2;
    await contact.save();

    res.status(200).send({ message: 'Reply sent and contact updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

module.exports = router;
