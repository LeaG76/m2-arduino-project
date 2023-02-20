var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var walker = __dirname + "/../public/databases/walkers.json"

router.post('/', (req, res) => {
    fs.readFile(walker, 'utf8', (err, fileData) => {
        if(err) {
            return res.status(500).send({error: err, message:__dirname});
        }
        let jsonData;
        try {
            jsonData = JSON.parse(fileData);
        }
        catch(e) {
            jsonData = {};
        }
        // get the last id
        let lastId = 0;
        if (Object.keys(jsonData).length > 0) {
            lastId = Object.keys(jsonData).sort().pop();
        }
        // add the new walker
        jsonData[parseInt(lastId) + 1] = req.body;
        // write the file
        fs.writeFile(walker, JSON.stringify(jsonData), 'utf8', (err) => {
            if(err) {
                return res.status(500).send({error: err, message:__dirname});
            }
            res.send({success: 'Data written to file'});
        }
    );
});
});

module.exports = router;