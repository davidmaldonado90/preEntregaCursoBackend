import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const cartRouter = Router()
const carts = new cartManager()

cartRouter.get ("/", async (req,res) => {
    res.send (await carts.readCart())
})


cartRouter.get("/:cid", async (req,res) => {
    const cid = req.params.cid
    res.send (await carts.getCartById(cid))
})

cartRouter.post("/", async (req,res) =>{
    res.send (await carts.addCart())
})

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    res.send (await carts.addProductInCart(cartId, prodId))
})

export default cartRouter