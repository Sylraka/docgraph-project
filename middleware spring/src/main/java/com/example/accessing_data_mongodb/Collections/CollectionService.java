package com.example.accessing_data_mongodb.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//für richtige schichtenarchitektur für CRUD-Opertationen 

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository repository;

    public List<Collections> getAllCollections() {
        return repository.findAll();
    }

    public Collections createCollection(Collections collection) {
        return repository.save(collection);
    }

    public Collections getCollectionById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }

    public Collections updateCollectionById(String id, Collections updatedCollection) {
        return repository.findById(id)
                .map(collection -> {
                    collection.setCollectionName(updatedCollection.getCollectionName());
                    return repository.save(collection);
                })
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }

    public void deleteCollectionById(String id) {
        Collections collection = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
        repository.delete(collection);
    }
}
