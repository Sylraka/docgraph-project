package com.example.accessing_data_mongodb.Boards;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));
    }

    public Boards updateBoardById(Boards updatedBoard) {
        return repository.findById(updatedBoard.getId())
                .map(existingBoard -> {
                    existingBoard.setBoard(updatedBoard);
                    return repository.save(existingBoard);
                })
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + updatedBoard.getId()));
    }

    @Transactional // datenbankänderungen: alle oder garkeine
    public List<Boards> updateBoardsById(List<Boards> updatedBoards) {
        List<Boards> updatedBoardsList = new ArrayList<>();
        for (Boards updatedBoard : updatedBoards) {
            repository.findById(updatedBoard.getId())
                    .map(existingBoard -> {
                        existingBoard.setBoard(updatedBoard);
                        // existingBoard.setBoardName(updatedBoard.getBoardName());
                        // existingBoard.setBoardRubrics(updatedBoard.getBoardRubrics());
                        // Weitere Felder setzen, wenn nötig...

                        updatedBoardsList.add(repository.save(existingBoard));
                        return existingBoard;
                    })
                    .orElseThrow(() -> new RuntimeException("Board not found with id: " + updatedBoard.getId()));
        }

        return updatedBoardsList;
    }

    public void deleteBoardById(String id) {
        Boards collection = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));
        repository.delete(collection);
    }
}
