require('dotenv').config();
require("tedious");
const express = require('express');
const paypal = require('paypal-rest-sdk');
const app = express();
const reservationRoutes = require('./src/routes/reservation');

// Configura PayPal
paypal.configure({
  'mode': 'sandbox', // O 'live' para producción
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET
});

app.use(express.json());

// Endpoint para crear un pago
app.post('/pay', (req, res) => {
  const { amount, currency, description } = req.body;

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/success",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Hotel Reservation",
          "sku": "001",
          "price": amount,
          "currency": currency,
          "quantity": 1
        }]
      },
      "amount": {
        "currency": currency,
        "total": amount
      },
      "description": description
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      res.status(500).json({ error: "Error creating PayPal payment" });
    } else {
      // Busca el link de aprobación para redirigir al usuario
      for(let i = 0; i < payment.links.length; i++){
        if(payment.links[i].rel === 'approval_url'){
          res.json({ approval_url: payment.links[i].href });
          return;
        }
      }
      res.status(500).json({ error: "No approval URL found" });
    }
  });
});

// Endpoint para ejecutar el pago exitoso
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD", // Asegúrate de que coincida con el monto inicial
        "total": "25.00"   // El monto debe ser exacto
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      res.status(500).json({ error: "Payment execution failed" });
    } else {
      console.log(JSON.stringify(payment));
      res.status(200).send("Payment successful! Transaction ID: " + payment.id);
    }
  });
});

// Endpoint para el pago cancelado
app.get('/cancel', (req, res) => {
  res.status(400).send("Payment cancelled by the user.");
});

const PORT = process.env.PORT || 3000;

app.use("/reservations", reservationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});