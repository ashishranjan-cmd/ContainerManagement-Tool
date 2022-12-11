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
        res.send("<pre>" + stdout + "</pre> <a href='/ps'> Click Here</a>");
    })
})

app.get("/ps", (req,res) => {
    // exec("docker ps | tail  -n +2 | awk '{ print $2 , $7, $10}'", (err, stdout, stderr) => {
    //    res.send("<pre>" + stdout + "</pre>");
    // })

    exec("docker ps | tail -n +2" , (err, stdout, stderr) => {
        // console.log( stdout.split("\n")[1] );  // splitting the columns in docker ps command display page

        let a =  stdout.split("\n");  // storing the entire value in a variable
        a.forEach(( cdetails) => { 
            cinfo = cdetails.trim().split(/\s+/) ;
            console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[2]);
            res.write(cinfo[0] + " " + cinfo[1] + " " + cinfo[2])
        })
        // res.send("<pre>" + stdout + "</pre>");
        res.send();
    })
})
app.listen(3000, () => {console.log("container app tool started.")})