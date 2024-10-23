const db = require("../models");
const Collection = db.collections;



// Create and Save a new Collection
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      //write down in docker logs
      console.info("received requestbody:", req.body);
      res.status(400).send({ message: "Body can not be empty!" });
      return;
    }
    // Create a Collection
    const collection = new Collection({
        collectionName: req.body.collectionName,

    });
    // Save Collection in the database
    collection
      .save(collection)
      .then(data => {
        console.log('Saved entry:', data)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the colection."
        });
      });
  };

  // Retrieve all Collections from the database.
exports.findAll = (req, res) => {
    let condition = {};

    Collection.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Collections."
        });
      });
  };