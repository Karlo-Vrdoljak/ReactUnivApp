const express = require('express');
const app = express();
const port = 3000;
const db = require('./db.js');
const cors = require('cors');

app.use(cors())

app.get('/manufacturer/', (req, res) => {
    res.send(db.manufacturers.map(m => {
        return {
            label: m.label,
            pkManufacturer: m.pkManufacturer,
        }
    }));
});

app.get('/manufacturer/:pkManufacturer/', (req, res) => {
    res.send(db.manufacturers.find(m => m.pkManufacturer == req.params.pkManufacturer));
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})