// import express from 'express';
const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 5000;

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Rushikeshwayal@007",
    database:"school"

})
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/',(req,res)=>{
    res.send("home")
})


app.get('/listSchools',(req,res)=>{
    const query = "select * from schools"
    db.query(query,(err,data)=>{
        if (err) {
            return res.json('Error')
        }
        else{
            return res.json(data)
        }
    });
})

app.get("/listSchools:id",(req,res)=>{
    const id = Number(req.params.id);
     const query = "select * from schools"
    db.query(query,(err,data)=>{
        if (err) {
            return res.json('Error')
        }
        else{
            const schoolId = data.find((itemId)=>itemId.id===id) 
            return res.json(schoolId)
        }
    })

})
// app.use(express.urlencoded({extended:false}))

app.post('/addSchool',(req,res)=>{
    const body = req.body;
    console.log(body)
    const {name,address,latitude,longitude} = req.body;
    const query = "insert into schools(name,address,latitude,longitude) values(?,?,?,?)"
    db.query(query,[name,address,latitude,longitude],(err,data)=>{
        if (err) {
            console.log(err)
        }
        else{
return res.json({status:"success",data:req.body})
        }
    })
    
    
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/listSchools/distance', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    const sql = 'SELECT id, name, address, latitude, longitude FROM schools';
    db.query(sql, (err, schools) => {
        if (err) {
            console.error('Error fetching schools:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Calculate distance and sort
        const sortedSchools = schools.map((school) => {
            const distance = getDistanceFromLatLonInKm(latitude, longitude, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    });
});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}




app.listen(PORT , ()=>console.log(`server is live on ${PORT} `))