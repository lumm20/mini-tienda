import app from "./src/app.js";
import { sequelize } from "./src/config/db.config.js";
import './src/models/index.js'; 

const PORT = process.env.PORT || 3000;

async function main() {
    try {

        await sequelize.sync({ force: false, alter: true });
        console.log("Base de datos conectada y sincronizada");

        // Server goes brrr
        app.listen(PORT, () => {
            console.log(`Servidor corriendo "pasado de lanza" en http://localhost:${PORT}`);
            console.log(`API lista en http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

main();