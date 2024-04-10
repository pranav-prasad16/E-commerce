const stripe = require('stripe');
const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/paymentModel');

const payment = (req, res) => {
  const { product, token } = req.body;
  console.log('Product :', product);
  console.log('Product price : ', product.price);
  try {
    const idempotencyKey = uuidv4();

    return stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) =>
        stripe.charges.create(
          {
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            address: {
              name: token.card.name,
              country: token.card.address_country,
            },
          },
          { idempotencyKey }
        )
      )
      .then(res.status(200).json(result))
      .catch((err) => console.error('Error : ', err));
  } catch (error) {
    console.error('Error :', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = { payment };
