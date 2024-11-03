const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/paymentModel');

const payment = (req, res) => {
  const { product, token } = req.body;
  console.log('Product:', product);
  console.log('Product price:', product.price);

  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) =>
      stripe.charges.create(
        {
          amount: product.price * 100, // Convert to cents
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      )
    )
    .then((charge) => {
      const paymentData = new Payment({
        customerId: charge.customer,
        productId: product.id,
        amount: charge.amount,
        currency: charge.currency,
        description: charge.description,
        receipt_email: charge.receipt_email,
        payment_status: charge.status,
        shipping: {
          name: charge.shipping.name,
          address: charge.shipping.address,
        },
        createdAt: new Date(),
      });

      return paymentData.save();
    })
    .then((savedPayment) => {
      res.status(200).json(savedPayment); // Send the saved payment record to the frontend
    })
    .catch((err) => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Payment failed' });
    });
};

module.exports = { payment };
