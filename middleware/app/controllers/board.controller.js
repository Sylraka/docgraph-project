const db = require("../models");
const Board = db.boards;


// Create and Save a new Board
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    //write down in docker logs
    console.info("received requestbody:", req.body);
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  // Create a Board
  const board = new Board({
    boardName: req.body.boardName,
    boardType: req.body.boardType,
    boardPosition: req.body.boardPosition,
    cardList: req.body.cardList,
    arrowList: req.body.arrowList,
    cardIDCounter: req.body.cardIDCounter,
    arrowIDCounter: req.body.arrowIDCounter,
    anchorIDCounter: req.body.anchorIDCounter
    /*    published: req.body.published ? req.body.published : false */
  });
  // Save Board in the database
  board
    .save(board)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the board."
      });
    });
};

// Retrieve all Boards from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Board.find(condition)
  .select("_id boardName boardPosition")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards."
      });
    });
};
// Find a single Board with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Board.findById(id)
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
  Board.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

exports.updateAll = async (req, res) => {
  //console.log(req.body);  // Überprüfe die Daten, die gesendet werden
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const updatePromises = req.body.map(async (item) => {
    const { _id, ...updateData } = item;  // Zerteile das Item in _id und die restlichen Daten

    try {
      const data = await Board.findByIdAndUpdate(_id, { $set: updateData }, { useFindAndModify: false});
      if (!data) {
        return {
          id: _id,
          message: `Cannot update Board with id=${_id}. Maybe Board was not found!`
        };
      } else {
        return {
          id: _id,
          message: "Board was updated successfully."
        };
      }
    } catch (err) {
      return {
        id: _id,
        message: "Error updating Board with id=" + _id
      };
    }
  });

  // Warten auf alle Promises und senden der Antworten
  try {
    const results = await Promise.all(updatePromises);
    res.send(results);  // Sende alle Ergebnisse zurück
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while updating boards."
    });
  }
};


// Delete a Board with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Board.findByIdAndRemove(id)
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

// Delete all Boards from the database.
/*exports.deleteAll = (req, res) => {
    Board.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Boards were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all boards."
        });
      });
  };*/
// Find all published Boards
exports.findAllPublished = (req, res) => {
  Board.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards."
      });
    });
};