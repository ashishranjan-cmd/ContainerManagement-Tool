const express = require("express")
const app = express()

app.get("/runform", (req, res) => {
    res.sendFile(__dirname + "/rundocker.html");
})
app.listen(3000, () => {console.log("container app tool started.")})