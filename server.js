const { exec } = require("child_process")

const express = require("express")
const app = express()

app.get("/runform", (req, res) => {
    res.sendFile(__dirname + "/rundocker.html");
})

app.get("/run", (req,res) => {
    const cname = req.query.cname;
    const cimage = req.query.cimage;

    // res.send(cimage);
    exec('docker run -dit --name ' + cname + " " + cimage , (err, stdout, stderr) => {
        console.log(stdout);
        res.send("<pre>" + stdout + "</pre>");
    })
})

app.get("/ps", (req,res) => {
    exec("docker ps", (err, stdout, stderr) => {
        res.send("<pre>" + stdout + "</pre>");
    })
})
app.listen(3000, () => {console.log("container app tool started.")})