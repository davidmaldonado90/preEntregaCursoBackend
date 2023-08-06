import { Router} from "express";
import ProductManager from "../controllers/productManager.js";

const views = Router()
const products = new ProductManager()

views.get('/', async (req, res)=>{
    const prod = await products.getProducts();
    res.render("index", { products: prod });

})

views.get('/realTimeProducts', (req, res)=>{
    res.render("realTimeProducts");

})

export default views