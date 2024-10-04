const db = require("../models");
const MultiBoard = db.multiboard;



// Update a Board by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    //the id of multi-board
    const id = req.params.id;
    MultiBoard.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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


  // Find a single Board with an id
exports.findOne = (req, res) => {
        //the id of multi-board
    const id = req.params.id;
    MultiBoard.findById(id)
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