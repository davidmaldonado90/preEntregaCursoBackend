import fs from 'fs'
import { nanoid } from 'nanoid'

class ProductManager{
    constructor(){
        this.path = './src/models/products.json'
    }

    readProducts = async () =>{
        const products = await fs.promises.readFile(this.path, 'utf-8')
        return  JSON.parse(products)
    }

    writeProducts = async (product) => {
        await fs.promises.writeFile(this.path, JSON.stringify(product))

    }

    exist =async (id) =>{
        const prodId = await this.readProducts()
        return prodId.find(el => el.id === id)
    }

    addProducts = async (product) => {
        const oldProducts = await this.readProducts() 
        product.id = nanoid()       
        const allProducts = [...oldProducts, product]
        await this.writeProducts(allProducts)
        return "added product"
    }

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductById = async (id)=>{
        const foundProd = await this.exist(id)
        if(!foundProd) return "product not found"
        return foundProd
        
    }

    updateProducts = async (id, product)=>{
        const updateProd = await this.exist(id)
        if(!updateProd) return "product not found"
        await this.deleteProducts(id)
        const readProd = await this.readProducts()
        const update = [{...product, id: id}, ...readProd]
        await this.writeProducts(update)
        return "Updated Product"
    }

    deleteProducts = async (id) =>{
            const delProd = await this.readProducts()
            const exist = delProd.some(el => el.id === id)
            if (exist){
                const filter = delProd.filter(el => el.id != id)
                await this.writeProducts(filter)
                return "delete product"
        }else{
            return "product to delete doesnt exist"
        }
            }

        

        }
    

export default ProductManager
