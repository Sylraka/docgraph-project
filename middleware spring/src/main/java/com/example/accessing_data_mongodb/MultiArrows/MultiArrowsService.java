package com.example.accessing_data_mongodb.MultiArrows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//für richtige schichtenarchitektur für CRUD-Opertationen 

@Service
public class MultiArrowsService {

    @Autowired
    private MultiArrowsRepository repository;

    public List<MultiArrows> getAllMultiArrows(String collectionID) {
        System.out.println("findByCollectionID "+  collectionID);
        return repository.findByCollectionID(collectionID);
    }

    public MultiArrows createMultiArrow(MultiArrows collection) {
        return repository.save(collection);
    }

    public MultiArrows getMultiArrowById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }

    public MultiArrows updateMultiArrowById(String id, MultiArrows updatedMultiArrow) {
        return repository.findById(id)
                .map(multiArrow -> {
                    multiArrow.setMultiArrow(updatedMultiArrow);
                    return repository.save(multiArrow);
                })
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }

    public void deleteMultiArrowById(String id) {
        MultiArrows multiArrow = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
        repository.delete(multiArrow);
    }
}
