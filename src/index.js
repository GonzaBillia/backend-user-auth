import app from './app.js'
import MongoConfig from './config/mongoose.config.js'


const PORT = 3000
const HOST = "localhost"

app.listen(PORT, () => {
    console.log(`Ejecutándose en el puerto ${PORT}`)
    MongoConfig.connectDB()
})