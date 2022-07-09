const { Router } = require('express');
const axios = require('axios');
const {Product, Brand, Category, Image_Product} = require("../db")


const router = Router();

const getDbInfo = async () => {
    let db = await Product.findAll({
        include:[{
            model: Brand,
            attributes: ['name']
        },
        {
            model: Category,
            attributes: ['name']
        },
        {
            model: Image_Product,
            attributes: ['image']
        }
    ]
    });
    const finalDb = db.map(d => {
        return {
            id: d.id,
            name: d.name,
            description: d.description,
            model: d.model,
            price: d.price,
            creationDate: d.creationDate,
            updateDate: d.updateDate,
            brand: d.Brands,
            category: d.Categories,
            image: d.Image_Products,
            user: d.Users
        }
    })
    return finalDb
};

router.get('/', async (req, res, next)=>{
    const name = req.query.name;
    try{
        let totalProducts = await getDbInfo();
        if (name) {
            let productName = await totalProducts.filter(t => t.name.toLowerCase().includes(name.toLowerCase()))
            productName.length ?
            res.status(200).send(productName) :
             res.status(404).send('unfinded')
     } 
     else{
        res.status(200).send(totalProducts)
     }
    } catch (error){
        next(error)
    } 
});

module.exports = router;