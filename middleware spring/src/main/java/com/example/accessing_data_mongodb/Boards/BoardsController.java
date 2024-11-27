package com.example.accessing_data_mongodb.Boards;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//Der Controller stellt die Endpunkte bereit, über die die Collections abgerufen werden können.
@RestController
@RequestMapping("/api/boards")
@CrossOrigin(origins = "http://localhost:5173") // damit der zugriff möglich wird
public class BoardsController {
    @Autowired
    private BoardsService boardsService;

    @GetMapping
    public List<Boards> getAllBoards(@RequestParam String collectionID) {
        // Überprüfe, ob collectionID korrekt empfangen wird
        System.out.println("Received collectionID: " + collectionID);
        return boardsService.getAllBoards(collectionID);
    }

    @PostMapping
    public Boards createBoard(@RequestBody Boards board) {
        return boardsService.createBoard(board);
    }

    @GetMapping("/{id}")
    public Boards getBoardById(@PathVariable String id) {
        return boardsService.getBoardById(id);
    }

    @PutMapping
    public List<Boards> updateBoardsById(@RequestBody List<Boards> updatedBoards) {
        return boardsService.updateBoardsById(updatedBoards);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBoardById(@PathVariable String id) {
        boardsService.deleteBoardById(id);
        return ResponseEntity.noContent().build();
    }

}
