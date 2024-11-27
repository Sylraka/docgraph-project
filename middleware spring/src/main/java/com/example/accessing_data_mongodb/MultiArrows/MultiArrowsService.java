package com.example.accessing_data_mongodb.MultiArrows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.accessing_data_mongodb.Boards.Boards;

import java.util.ArrayList;
import java.util.List;

//für richtige schichtenarchitektur für CRUD-Opertationen 

@Service
public class MultiArrowsService {

    @Autowired
    private MultiArrowsRepository repository;

    public List<MultiArrows> getAllMultiArrows(String collectionID) {
        System.out.println("findByCollectionID " + collectionID);
        return repository.findByCollectionID(collectionID);
    }

    public MultiArrows createMultiArrow(MultiArrows collection) {
        return repository.save(collection);
    }

    @Transactional // datenbankänderungen: alle oder garkeine
    public List<MultiArrows> updateMultiArrows(List<MultiArrows> updatedArrows) {
        List<MultiArrows> updatedArrowList = new ArrayList<>();
        for (MultiArrows updatedArrow : updatedArrows) {
            MultiArrows existingArrow = repository.findById(updatedArrow.getId())
                    .orElseThrow(() -> new RuntimeException("Arrow not found with id: " + updatedArrow.getId()));

            // Aktualisiere das bestehende Arrow mit den neuen Daten
            existingArrow.setMultiArrow(updatedArrow);

            // Speichere das aktualisierte Arrow und füge es zur Ergebnisliste hinzu
            updatedArrowList.add(repository.save(existingArrow));
        }

        return updatedArrowList;
    }

    public MultiArrows getMultiArrowById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arrow not found with id: " + id));
    }

    public MultiArrows updateMultiArrowById(String id, MultiArrows updatedMultiArrow) {
        return repository.findById(id)
                .map(multiArrow -> {
                    multiArrow.setMultiArrow(updatedMultiArrow);
                    return repository.save(multiArrow);
                })
                .orElseThrow(() -> new RuntimeException("Arrow not found with id: " + id));
    }

    public void deleteMultiArrowById(String id) {
        MultiArrows multiArrow = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Arrow not found with id: " + id));
        repository.delete(multiArrow);
    }
}
