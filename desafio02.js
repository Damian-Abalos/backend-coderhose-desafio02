const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.productos = [];
    }

    save(nombreProducto, precio, ulrImagenProducto) {
        

        let ultimoId;

        let ultimoProducto = this.productos[this.productos.length - 1];

        if (this.productos.length == 0) {
            ultimoId = 0
        } else {
            ultimoId = ultimoProducto.id 
        }

        let nuevoProducto = {
            title: nombreProducto,
            price: precio,
            thumbnail: ulrImagenProducto,
            id: ultimoId + 1
        }

        this.productos.push(nuevoProducto);

        let jsonProducts = JSON.stringify(this.productos);

        try{
            fs.writeFileSync(this.nombreArchivo, jsonProducts);
            console.log(`producto creado con id:${nuevoProducto.id}`);
        } catch (err) {
            console.log(err)
        } 
    }

    getById(id) {
        try {           
            let idProducto = this.productos.find((producto) => producto.id == id) || null;
            console.log(`producto con id ${id}:`);
            console.log(idProducto);
        } catch (err) {
            console.log(err)
        }
        
    }

    getAll() {
        try {
            const file = fs.readFileSync(this.nombreArchivo, "utf-8")
            console.log("lectura exitosa");
            console.log(JSON.parse(file));            
        } catch (err) {
            console.log(err)
        }
    }

    deleteById(id) {

            this.productos.splice(id-1, 1);
            let jsonProducts = JSON.stringify(this.productos);
            try {
                fs.writeFileSync(this.nombreArchivo, jsonProducts)
                console.log(`producto con id ${id} eliminado`);
            } catch (err) {
                console.log(err)
            }
    }

    deleteAll() {
        try {
            fs.unlinkSync(this.nombreArchivo);
            console.log('archivo eliminado');
        } catch (error) {
            console.log(error);
        }
        
    }
}

const contenedor1 = new Contenedor("./productos.txt");

contenedor1.save("Escuadra",100,"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
contenedor1.save("Calculadora",200,"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
contenedor1.save("Globo Terráqueo",200,"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");

contenedor1.getAll();
contenedor1.getById(2);
contenedor1.getById(4);
contenedor1.deleteById(2);
contenedor1.getAll();
contenedor1.save("El último de prueba",200,"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");
contenedor1.getAll();
contenedor1.deleteAll();
