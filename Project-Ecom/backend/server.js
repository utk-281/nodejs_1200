import { log } from "console"
import { connectDB } from "./src/config/database.config.js"
import app from "./app.js"

connectDB().then(() => {
    app.listen(process.env.PORT, (err) => {
        if (err) {
            log("Problem in server startup....")
            log(err)
            process.exit(1)
        }
        log("Server started on PORT: " + process.env.PORT)
    })
}).catch((err) => {
    log("Problem in database connection....")
    log(err)
    process.exit(1) // exit the application, without trying to reconnect
})