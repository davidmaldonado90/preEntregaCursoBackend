import express from "express";
import productRoutes from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products",productRoutes)
app.use("/api/cart", cartRouter)


app.listen(PORT, ()=>{
    console.log(`running on port: ${PORT}`);
})