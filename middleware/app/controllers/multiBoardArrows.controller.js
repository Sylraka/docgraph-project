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
        const data = await Arrow.findByIdAndUpdate(_id, { $set: updateData }, { useFindAndModify: false});
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