const db = require("../models");
const Arrow = db.multiBoardArrows;



// Create and Save a new Arrow
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    //write down in docker logs
    console.info("received requestbody:", req.body);
    res.status(400).send({ message: "Body can not be empty!" });
    return;
  }
  // Create a Arrow
  const arrow = new Arrow({
    arrowType: req.body.arrowType,
    anchorStart: req.body.anchorStart,
    anchorEnd: req.body.anchorEnd,
    /*    published: req.body.published ? req.body.published : false */
  });
  // Save Arrow in the database
  arrow
    .save(arrow)
    .then(data => {
      console.log('Saved entry:', data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the arrow."
      });
    });
};


// Retrieve all Arrows from the database.
exports.findAll = (req, res) => {
  var condition = {};
  Arrow.find(condition)
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

exports.delete = async (req, res) => {
  try {
    const arrowId = req.params.id; // Die ID des zu löschenden Arrows wird aus der URL entnommen

    // Versuche, den Arrow in der Datenbank zu finden und zu löschen
    const deletedArrow = await Arrow.findByIdAndDelete(arrowId);
    console.log(deletedArrow)
    if (!deletedArrow) {
      // Wenn der Arrow mit der angegebenen ID nicht gefunden wurde
      return res.status(404).json({ message: 'Arrow not found' });
    }

    // Erfolgreiche Löschung
    return res.status(200).json({ message: 'Arrow successfully deleted', arrowId });
  } catch (error) {
    // Wenn ein Fehler aufgetreten ist, sende eine Fehlermeldung zurück
    return res.status(500).json({ message: 'Error deleting arrow', error: error.message });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Arrow.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

//save all 
exports.updateAll = async (req, res) => {
  //console.log(req.body);  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const updatePromises = req.body.map(async (item) => {
    const { _id, ...updateData } = item;  // split the Item in _id and the rest

    try {
      const data = await Arrow.findByIdAndUpdate(_id, { $set: updateData }, { useFindAndModify: false });
      if (!data) {
        return {
          id: _id,
          message: `Cannot update Arrow with id=${_id}. Maybe Arrow was not found!`
        };
      } else {
        return {
          id: _id,
          message: "Arrow was updated successfully."
        };
      }
    } catch (err) {
      return {
        id: _id,
        message: "Error updating Arrow with id=" + _id
      };
    }
  });

  // Warten auf alle Promises und senden der Antworten
  try {
    const results = await Promise.all(updatePromises);
    res.send(results);  // Sende alle Ergebnisse zurück
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while updating Arrows."
    });
  }
};