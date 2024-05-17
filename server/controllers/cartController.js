const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel');

const getCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'cartItems',
      populate: { path: 'product', select: 'name price image' },
    });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error: ', error.message);
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

const addCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItemsIds = Promise.all(
      req.body.cartItems.map(async (cartItem) => {
        if (!cartItem || !cartItem.product || !cartItem.quantity) {
          throw new Error('Product ID is required for each cart item');
        }
        const existingCartItem = await CartItem.findOne({
          product: cartItem.product,
        }).populate({ path: 'product', select: 'price' });

        if (existingCartItem) {
          if (!existingCartItem.product) {
            console.error(
              'Product not found for existing cart item:',
              existingCartItem
            );
            // return res
            //   .status(404)
            //   .json({ msg: 'Product not found for existing cart item' });
          }
          const existingCart = await Cart.findOne({
            user: userId,
          });
          if (!existingCart) {
            console.error('Cart not found for user:', userId);
            // return res.status(404).json({ msg: 'Cart not found for user' });
          }

          existingCartItem.quantity += cartItem.quantity;
          await existingCartItem.save();

          let totalPrice = existingCart.totalPrice || 0;
          if (existingCartItem.product && existingCartItem.product.price) {
            totalPrice += cartItem.quantity * existingCartItem.product.price;
          } else {
            console.error(
              'Product price not available for cart item:',
              existingCartItem
            );
            // return res.status(500).json({ msg: 'Product price not available' });
          }

          existingCart.totalPrice = totalPrice;
          await existingCart.save();
          return res.status(201).json(existingCart);
        } else {
          let newCartItem = new CartItem({
            quantity: cartItem.quantity,
            product: cartItem.product,
          });
          newCartItem = await newCartItem.save();
          return newCartItem._id;
        }
      })
    );
    const cartItemsIdsResolved = await cartItemsIds;

    let totalPrices = 0;
    if (cartItemsIdsResolved.length) {
      totalPrices = await Promise.all(
        cartItemsIdsResolved.map(async (cartItemId) => {
          const cartItem = await CartItem.findById(cartItemId).populate({
            path: 'product',
            select: 'price',
          });

          const totalPrice = cartItem.product.price * cartItem.quantity;

          return totalPrice;
        })
      );
      const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ msg: 'Cart not found' });
      }

      const totalPriceresolved = cart.totalPrice + totalPrice;

      cart.cartItems = [...cart.cartItems, ...cartItemsIdsResolved];
      cart.totalPrice = totalPriceresolved;

      await cart.save();
      return res.status(200).json(cart);
    }
  } catch (error) {
    console.error('Error: ', error.message);
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

const deleteCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    await Promise.all(
      cart.cartItems.map(async (cartItem) => {
        await CartItem.findByIdAndDelete(cartItem);
      })
    );

    return res.status(200).json({ msg: 'Cart items deleted' });
  } catch (error) {
    console.error('Error: ', error.message);
    return res.status(500).json({ msg: 'Internal Server error' });
  }
};

module.exports = { getCartItems, addCartItems, deleteCartItems };
