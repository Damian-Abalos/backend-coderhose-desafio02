const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.productos = [];
    }

    leerDirectorio(miCarpeta) {
        const directorio = fs.readdirSync(miCarpeta);
        console.log(directorio);
    }

    sobreescribir(nuevoTexto) {
        fs.writeFileSync(this.nombreArchivo, nuevoTexto);
    }

    agregarContenido(nuevoContenido) {
        fs.appendFileSync(this.nombreArchivo, nuevoContenido);
    }

    save(nombreProducto, precio, ulrImagenProducto) {
        let ultimoId = this.productos.length + 1;
        let nuevoProducto = {
            title: nombreProducto,
            price: precio,
            thumbnail: ulrImagenProducto,
            id: ultimoId,
        };
        this.productos.push(nuevoProducto);
        let jsonProducts = JSON.stringify(this.productos);
        fs.writeFileSync(this.nombreArchivo, jsonProducts);
    }

    getById(id) {
        let idProducto = this.productos.find((producto) => producto.id == id);
        console.log(idProducto);
    }

    getAll() {
        fs.readFile(this.nombreArchivo, "utf-8", (err, res) => {
            if (err) {
                throw new Error(`error en lectura ${err}`);
            }

            console.log("lectura exitosa");

            const data = {
                contenidoStr: res,
                contenidoObj: JSON.parse(res)
            };

            console.log(data.contenidoObj);
        });
    }

    deleteById(id) {
        try {
            this.productos.splice(id-1, 1);
            console.log(`producto eliminado`);
            let jsonProducts = JSON.stringify(this.productos);
            fs.writeFileSync(this.nombreArchivo, jsonProducts);
        
        } catch (err) {
            console.log(err);
        }
    }

    deleteAll() {
        fs.unlinkSync(this.nombreArchivo);
    }
}

const contenedor1 = new Contenedor("./productos.txt");

contenedor1.save("Escuadra",100,"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png");
contenedor1.save("Calculadora",200,"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png");
contenedor1.save("Globo Terráqueo",200,"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png");

contenedor1.getAll();
contenedor1.getById(1);
contenedor1.deleteById(2);
contenedor1.getAll();
