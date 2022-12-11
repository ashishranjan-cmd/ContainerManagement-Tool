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
        res.send("<pre>Container Launched Succesfully...." + "<br>" + "Container Id is  - " + stdout + "</pre>");
    })
})

app.get("/ps", (req,res) => {
    // exec("docker ps | tail  -n +2 | awk '{ print $2 , $7, $10}'", (err, stdout, stderr) => {
    //    res.send("<pre>" + stdout + "</pre>");
    // })

    exec("docker ps | tail -n +2" , (err, stdout, stderr) => {
        // console.log( stdout.split("\n")[1] );  // splitting the columns in docker ps command display page

        let a =  stdout.split("\n");  // storing the entire value in a variable
        res.write("<table border='5'  align='center' width='50%'>"); // to get td and tr tag work inside the callback function
        res.write("<tr><th>Container ID</th><th>Image Name</th><th>Command</th><th>Container Name</th></tr>")


        a.forEach(( cdetails) => { 
            cinfo = cdetails.trim().split(/\s+/) ;
            console.log(cinfo[0] + " " + cinfo[1] + " " + cinfo[2]);
            res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td>" + cinfo[1] + "</td>" + "<td>"+ cinfo[2] + "<td>" + cinfo[cinfo.length -1] + "</td>"+"</td>" + "</tr>")
        })
        // res.send("<pre>" + stdout + "</pre>");
        res.write("</table>")
        res.send();
    })
})
app.listen(3000, () => {console.log("container app tool started.")})