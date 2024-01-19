import { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,  // which origin you are allowing
    credentials: true
}))

// 3 configaration of express that are very handy,
// we will be reciving a lot of data in the backend and hence to avoid floding of data and breakdown of system we will use these configaration
// app.use are used with implementing configarion or middleware

app.use(express.json({limit: "16kb"})) //FOr json data : how much data limit you want to set to json.

app.use(express.urlencoded({extended: true, limit: "16kb"})) // For URL data : extended will let to include object inside object and also we are setting a limit of 16kb

app.use(express.static("public")) // store files and folder in a folder

// To access and set the users browser's cookie from our server 
app.use(cookieParser())

export default app