const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const UPI_ID = "himanshukok16@oksbi";
const MERCHANT_NAME = "MerchantName";
const CURRENCY = "INR";

app.post("/generate-payment", async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    let transactionID = "TXN" + Math.floor(Math.random() * 1000000);
    let upiPaymentLink = `upi://pay?pa=${UPI_ID}&pn=${MERCHANT_NAME}&am=${amount}&cu=${CURRENCY}&tid=${transactionID}`;

    try {
        const qrCodeDataURL = await QRCode.toDataURL(upiPaymentLink);
        res.json({ upiPaymentLink, qrCode: qrCodeDataURL });
    } catch (error) {
        res.status(500).json({ error: "Error generating QR code" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
