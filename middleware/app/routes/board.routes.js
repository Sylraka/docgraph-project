
// these are our routes
//  /api/boards: GET, POST, DELETE, PUT
//  /api/boards/:id: GET, PUT, DELETE
// /api/boards/published: GET
//https://expressjs.com/en/guide/routing.html

//zugriff auf query parameter, (teil der url, für filter, nach einem ?)
//app.get('/users', (req, res) => {
//  const age = req.query.age; // "30"
// zugriff auf path parameter, teil der url, vor dem ?
//  const userId = req.params.id; // hier ist userId "123"

// zugriff auf headers, metadaten wie content-type, authentifizierung
// const contentType = req.headers['content-type']; // z.B. "application/json"
// zugriff auf body, daten, die verarbeitet werden sollen
//const email = req.body.email; // z.B. "john@example.com"

module.exports = app => {
    const boards = require("../controllers/board.controller.js");
    var router = require("express").Router();
    // Create a new Board
    router.post("/", boards.create);
    // Retrieve all Boards
    router.get("/", boards.findAll);
    //update all boards, doesnt work
    router.put("/", boards.updateAll);

    // Retrieve all published Boards
    //router.get("/published", boards.findAllPublished);
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