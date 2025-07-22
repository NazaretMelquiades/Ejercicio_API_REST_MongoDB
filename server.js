const express = require('express');
const cowsay = require('cowsay');
const app = express();
const port = 3000;

//Middlewares
const error404 = require('./middlewares/error404');
const morgan = require('./middlewares/morgan');

// Parsear el body a JSON
app.use(express.json());

// Configuración del logger con morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// IMPORTAR RUTAS
const providersRoutes = require("./routes/providers.routes");
const productsRoutes = require("./routes/products.routes");

// HABILITAR RUTAS
app.use("/api/providers", providersRoutes);
app.use("/api/products", productsRoutes);

//Gestionar ruta inexistente
app.use(error404);

app.listen(port, () => {
    console.log(
        cowsay.say({
            text: `Example app listening on port http://localhost:${port}`,
            f: "owl", // Use the owl ASCII art // owl
        })
    );
})

module.exports = app;
