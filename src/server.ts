import app from './app'

const port = process.env.PORT

app.listen(port, () => {
    console.log("Escuchando el puerto: " + port)
})