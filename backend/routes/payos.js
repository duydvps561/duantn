var express = require('express');
var router = express.Router();
const PayOS = require("@payos/node");

const payos = new PayOS(
    '59480c35-a998-4686-996a-861a8e0f55f3', 'd314394e-d8c7-4d39-bfa0-f8b51c6a74c8', 'f766fa8ff2d8ad412b88fac17983296d914e7bed2de0e20073b71013f683c0e1'
);
const YOUR_DOMAIN = "http://localhost:3001";
router.post('/create-payment-link', async (req, res) => {
    const { amount, description, orderCode, returnUrl } = req.body;

    if (!amount || !description || !orderCode || !returnUrl) {
        return res.status(400).json({ 
            error: 'Thiếu thông tin yêu cầu',
            missingFields: {
                amount: !amount,
                description: !description,
                orderCode: !orderCode,
                returnUrl: !returnUrl
            }
        });
    }

    const order = {
        amount: amount, 
        description: orderCode, 
        orderCode: orderCode, 
        returnUrl: `${YOUR_DOMAIN}?success=true`,
        cancelUrl: `${YOUR_DOMAIN}?canceled=true`,
    };

    try {
        const paymentLink = await payos.createPaymentLink(order);

        res.json({ checkoutUrl: paymentLink.checkoutUrl });
    } catch (error) {
        console.error('Lỗi khi tạo liên kết thanh toán:', error);
        res.status(500).json({ error: 'Không thể tạo liên kết thanh toán' });
    }
});

module.exports = router;