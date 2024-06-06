
// these are our routes
//  /api/boards: GET, POST, DELETE
//  /api/boards/:id: GET, PUT, DELETE
// /api/boards/published: GET
//https://expressjs.com/en/guide/routing.html

module.exports = app => {
    const boards = require("../controllers/board.controller.js");
    var router = require("express").Router();
    // Create a new Board
    router.post("/", boards.create);
    // Retrieve all Boards
    router.get("/", boards.findAll);
    // Retrieve all published Boards
    router.get("/published", boards.findAllPublished);
    // Retrieve a single Board with id
    router.get("/:id", boards.findOne);
    // Update a Board with id
    router.put("/:id", boards.update);
    // Delete a Board with id
    router.delete("/:id", boards.delete);
    // delete all Boards (doesn't needed)
   //router.delete("/", boards.deleteAll);
    app.use('/api/boards', router);
  };