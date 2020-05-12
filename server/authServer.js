const secret = require("./constants/secret.js").secret
const cookieParser = require("cookie-parser")
const express = require("express")
const jwt = require("jsonwebtoken")
const logger = require("morgan")
const cors = require("cors");


const tokenName = "token";

const app = express()

app.use(cookieParser())
app.use(logger('dev'))
app.use(cors())

app.post("/login", (req, res) => {
    const accessToken = jwt.sign(req.query, secret);
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Credentials", true);
    res.cookie(tokenName, accessToken, {httpOnly: true, maxAge: 100000}).json({});
})



const port = process.env.AUTH_SERVER_PORT || 3002
app.listen(port, () => {
    console.log(`Auth server started at ${port}`)
})