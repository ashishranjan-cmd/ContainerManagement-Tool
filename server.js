const express = require("express")
const app = express()

app.get("/runform", (req, res) => {
    res.sendFile(__dirname + "/rundocker.html");
})

app.get("/run", (req,res) => {
    const cname = req.query.cname;
    const cimage = req.query.cimage;

    res.send(cimage);
})
app.listen(3000, () => {console.log("container app tool started.")})