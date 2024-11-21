package com.example.accessing_data_mongodb.Collections;

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
import org.springframework.web.bind.annotation.RestController;

//Der Controller stellt die Endpunkte bereit, über die die Collections abgerufen werden können.
@RestController
@RequestMapping("/api/collections")
@CrossOrigin(origins = "http://localhost:5173")
public class CollectionController {
     @Autowired
    private CollectionRepository repository;

    // Endpoint: Alle Dokumente aus der Collection abrufen
    @GetMapping
    public List<Collections> getAllCollections() {
        return repository.findAll();
    }
    @PostMapping
    public Collections createCollection(@RequestBody Collections collection) {
        return repository.save(collection);
    }
    @GetMapping("/{id}")
    public Collections getCollectionById(@PathVariable String id) {
        return repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }
    @PutMapping("/{id}")
    public Collections updateCollectionById(@PathVariable String id, @RequestBody Collections updatedCollection) {
        return repository.findById(id)
                .map(collection -> {
                    collection.setCollectionName(updatedCollection.getCollectionName());
                    return repository.save(collection);
                })
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCollectionById(@PathVariable String id){
        //get an optional<Collection>, if the collection cannot found the optional remains empty
        return repository.findById(id)
        //will only compute if optional is not empty
                .map(collection -> {
                          //collection is passed to the lambda function, which compute the deleting action
                    repository.delete(collection);
                    return ResponseEntity.noContent().build(); // 204 No Content
                })
                //will compute if optional is empty
                .orElseThrow(() -> new RuntimeException("Collection not found with id: " + id));
    }
    

}

