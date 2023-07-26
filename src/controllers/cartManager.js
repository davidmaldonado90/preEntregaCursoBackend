import fs from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from "../controllers/productManager.js";

const allproducts =  new ProductManager()


class cartManager{
    constructor(){
        this.path = './src/models/carts.json'
    }

    readCart = async () =>{
        const cart = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(cart)
    }

    writeCart = async (cart) => {
        await fs.promises.writeFile(this.path, JSON.stringify(cart))
    }

    exist = async (id) =>{
        const cartId = await this.readCart()
        return cartId.find(el => el.id === id)
    }

    addCart = async () => {
        const oldCart = await this.readCart()
        const id = nanoid()
        const cart = [{id:id, products : []}, ...oldCart]
        await this.writeCart(cart)
        return "cart created"
    }

    getCartById = async (id) => {
        const foundCart = await this.exist(id)
        if(!foundCart) return "cart not found"
        return foundCart
        
    }


    addProductInCart = async (cartId, prodId) => {
        const foundCart = await this.exist(cartId);
        if (!foundCart) return "cart not found";
    
        const prodById = await allproducts.exist(prodId);
        if (!prodById) return "product not found";
    
        const cartsProducts = await this.readCart();
        const updatedCart = cartsProducts.find(cart => cart.id === cartId);
    
        if (!updatedCart) {
            const newCart = { id: cartId, products: [{ id: prodById.id, quantity: 1 }] };
            await this.writeCart([newCart, ...cartsProducts]);
            return "aggregate product to cart"; 
        }
    
        if (updatedCart.products.some(prod => prod.id === prodId)) {
            updatedCart.products.forEach(prod => {
                if (prod.id === prodId) {
                    prod.quantity += 1;
                }
            });
            await this.writeCart(cartsProducts);
            return "added product to cart";
        }
    
        updatedCart.products.push({ id: prodById.id, quantity: 1 });
        await this.writeCart(cartsProducts);
        return "aggregate product to cart"; 
    }
    
    
    
    
}

export default cartManager