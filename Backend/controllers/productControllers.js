const Products = require('../modal/productSchema')



const addProducts = async(req,res) =>{
    try{
        const { title , image , company,price} = req.body
        const savedProduct = await Products.create({
            title , image , company,price
        });
        res.status(201).json({
            message: 'Product added successfully',
            product : savedProduct
        });
    }
    catch(error)
    {
        res.json({error : error})
    }
}
const addManyProducts = async (req, res) => {
    try {
        const products = req.body;
        const savedProducts = await Products.insertMany(products);
        res.status(201).json({
            message: 'Products added successfully',
            products: savedProducts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllProducts = async(req,res)=>{
    try{
        const allProducts = await Products.find({})
        res.json(allProducts)
    }
    catch(error)
    {
        res.json({error : error})
    }
}

module.exports = {addProducts, addManyProducts, getAllProducts}