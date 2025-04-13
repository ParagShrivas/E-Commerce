const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (recipientEmail, orderIds, products) => {
     const productList = products.map(product => `<li>${product.name} (x${product.quantity}) - ₹${product.totalAmount.toFixed(2)}</li>`).join('');

     const mailTransporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          secure: true,
          port: 465,
          auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS,
          },
     });

     const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipientEmail,
          subject: `Order Confirmation #${orderIds}`,
          html: `
            <h1>Thank you for your order!</h1>
            <p>Your order number(s): <strong>${orderIds}</strong>.</p>
            <p>Here are the details of your purchase:</p>
            <ul>${productList}</ul>
            <p>We will deliver your order within 5-7 days.</p>
            <p>Thank you for shopping with us!</p>
        `,
     };

     try {
          await mailTransporter.sendMail(mailOptions);
          // console.log('Email sent successfully to:', recipientEmail);
     } catch (error) {
          console.error('Error sending email:', error);
          throw new Error('Failed to send email.'); // Rethrow or handle the error as needed
     }
};

module.exports = sendOrderConfirmationEmail;
