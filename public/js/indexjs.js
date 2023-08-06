const socket = io(); 

socket.on("realTimeProducts", data => {
    const realTime = document.getElementById("productsList");
    realTime.innerHTML = "";
    try {
        const arrayProd = JSON.parse(data);
        
            arrayProd.forEach((el) => {
            const div = document.createElement("div");
            div.classList.add("realProd")
            div.innerHTML = `
    
            <h1>Nombre del producto: ${el.tittle}</h1>
            <p>Descripcion: ${el.description}</p>
            <p>Categoria: ${el.category}</p>
            
            `  
            realTime.appendChild(div)
    
        })

    } catch (error) {
        console.error(error);
        }
    });
    

