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

  // Find a single Board with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Collection.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Board with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Board with id=" + id });
      });
  };

  // Update a Board by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Collection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Board with id=${id}. Maybe Board was not found!`
          });
        } else res.send({ message: "Board was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Board with id=" + id
        });
      });
  };

  // Delete a Board with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Collection.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Board with id=${id}. Maybe Board was not found!`
          });
        } else {
          res.send({
            message: "Board was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Board with id=" + id
        });
      });
  };