import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const productRoutes = Router()
const product =  new ProductManager()

productRoutes.get("/", async (req,res) =>{
    res.send(await product.getProducts())
})

productRoutes.get("/:pid", async (req,res) =>{
    const pid = req.params.pid
    res.send(await product.getProductById(pid))
})

productRoutes.post("/", async (req,res) => {
    const newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

productRoutes.put("/:pid", async (req,res) => {
    const pid = req.params.pid
    const update = req.body
    res.send(await product.updateProducts(pid, update))
})


productRoutes.delete("/:pid", async (req,res)=>{
    const pid = req.params.pid
    res.send(await product.deleteProducts(pid))
})

export default productRoutes