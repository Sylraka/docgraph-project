package com.example.accessing_data_mongodb.Boards;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BoardsService {
     @Autowired
    private BoardsRepository repository;

    public List<Boards> getAllBoards(String collectionID) {
        return repository.findByCollectionID(collectionID);
    }

    public Boards createBoard(Boards Board) {
        return repository.save(Board);
    }

    public Boards getBoardById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }

    public Boards updateBoardById(Boards updatedBoard) {
        return repository.findById(updatedBoard.id)
                .map(board -> {
                    board.setBoard(updatedBoard);
                    return repository.save(board);
                })
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + updatedBoard.id));
    }

    public void deleteBoardById(String id) {
        Boards collection = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
        repository.delete(collection);
    }
}
