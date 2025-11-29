import app from "./src/app.js";
import { sequelize } from "./src/config/db.config.js";
import { Product } from "./src/models/index.js";

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await sequelize.sync({ force: true, alter: true });
        await Product.bulkCreate([
            {
                name: "Cyberpunk 2077: Ultimate Edition",
                description: "RPG de mundo abierto en Night City. Gráficos brutales y neon por todos lados.",
                price: 1200.00,
                stock: 50
            },
            {
                name: "Elden Ring",
                description: "El GOTY definitivo. Prepárate para morir mil veces, pero épicamente.",
                price: 1100.00,
                stock: 30
            },
            {
                name: "God of War Ragnarök",
                description: "Acompaña a Kratos y Atreus en el fin del mundo nórdico. Historia 10/10.",
                price: 1350.00,
                stock: 25
            },
            {
                name: "Grand Theft Auto V",
                description: "El clásico que nunca muere. Mundo abierto, caos y misiones legendarias.",
                price: 500.00,
                stock: 100
            },
            {
                name: "Call of Duty: Modern Warfare III",
                description: "Puro disparo frenético. Ideal para el multiplayer con los compas.",
                price: 1400.00,
                stock: 40
            },
            {
                name: "The Legend of Zelda: TOTK",
                description: "Explora cielo y tierra en esta obra maestra de aventura y creatividad.",
                price: 1299.00,
                stock: 20
            },
            {
                name: "Minecraft Java & Bedrock",
                description: "Construye lo que quieras. El único límite es tu imaginación (y la RAM).",
                price: 600.00,
                stock: 60
            },
            {
                name: "EA SPORTS FC 24",
                description: "El fútbol más realista. Arma tu equipo de ensueño en Ultimate Team.",
                price: 1000.00,
                stock: 45
            }
        ]);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar:", error);
    }
}

main();