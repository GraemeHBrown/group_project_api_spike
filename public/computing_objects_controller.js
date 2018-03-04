const express = require('express');
const objectsRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log(err);
        return;
    }

    const db = client.db('education_app_spike');
    /*other routes could be created for different stages e.g. /objectList/early */
    //SHOW
    objectsRouter.get('/objectList', function (req, res) {
        const collection = db.collection('fixed_list_objects');
        collection.find({}).toArray(function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send();
            }
            res.json(docs);
        });
    });

    // objectsRouter.post('/objectList', function (req, res) {
    //     const collection = db.collection('computing_objects');
    //     console.log(req.body);
    //     collection.insert(req.body.data);
    //     res.status(200);
    //     res.send();
    // })

    //CREATE
    objectsRouter.post('/objectList', function (req, res) {
        const objectCollection = db.collection('fixed_list_objects');
        const objectToSave = req.body.computing_object;

        objectCollection.save(objectToSave, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send();
            }
            res.status(201);
            res.json(result.ops[0]);
            console.log('saved to database');
        })
    })

    //DELETE ALL
    objectsRouter.delete('/objectList', function (req, res) {
        const objectCollection = db.collection('fixed_list_objects');
        const filterObject = {};
        objectCollection.deleteMany(filterObject, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send();
            }
            res.status(204);
            res.send();
        })
    })

})


module.exports = objectsRouter;