const cart = require("../modal/cartSchema");

const addcarts = async (req, res) => {
  try {
    const { title, image, company, price } = req.body;
    console.log(title);
    const user = req.user._id;

    // Convert id to ObjectId

    const existingProduct = await cart.findOne({ user: user, title: title }).exec();
    console.log("existingProduct", existingProduct);

    if (existingProduct) {
      res.status(202).json({ result: "already in cart list" });
    } else {
      const cartProduct = await cart.create({
        title,
        image,
        company,
        price,
        quantity: 1,
        user: req.user._id,
      });
      res.status(201).json({
        message: "Product added to cart",
        cart: cartProduct,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllcartProducts = async (req, res) => {
  try {
    const user = req.user._id;
    console.log("Res:", user);
    const allcartProducts = await cart.find({ user: user });
    res.json(allcartProducts);
  } catch (error) {
    res.json({ error: error });
  }
};

const removeFromcart = async (req, res) => {
  try {
    const { _id: cartID } = req.params;

    const deletecart = await cart.findOneAndDelete({ cartID });
    res.json(deletecart);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addcarts, getAllcartProducts, removeFromcart };
