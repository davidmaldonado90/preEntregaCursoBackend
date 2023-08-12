import express from "express";
import productRoutes from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import views from "../src/routes/views.routes.js"
import handlebars from 'express-handlebars';
import __dirname from '../src/utils.js'
import path from 'path';
import { Server } from "socket.io";
import ProductManager from "./controllers/productManager.js";


const manager = new ProductManager()

const app = express()
const PORT = 8080

app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", productRoutes)
app.use("/api/cart", cartRouter)
app.use("/", views)

const serverHttp = app.listen(PORT, ()=> {
    console.log(`running on port: ${PORT}`);
})

const socketServer = new Server(serverHttp)


socketServer.on('connection', async (socket) => {

    const data = await manager.getProducts();
    socket.emit("realTimeProducts", JSON.stringify(data));

    socket.on("addProducts", async (productData) => {
        const newProduct = JSON.parse(productData);
        const addedProduct = await manager.addProducts(newProduct);
        socket.emit("productAdded", JSON.stringify(addedProduct));
    });

    socket.on("deleteProducts", async (productId) => {
        const deleteResult = await manager.deleteProducts(productId);
        if (deleteResult === "delete product") {
            socketServer.emit("productDeleted", productId);
        }
    });
});
