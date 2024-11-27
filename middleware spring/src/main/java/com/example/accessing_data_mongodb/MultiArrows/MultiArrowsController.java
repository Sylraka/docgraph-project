package com.example.accessing_data_mongodb.MultiArrows;

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
@RequestMapping("/api/arrows")
@CrossOrigin(origins = "http://localhost:5173")//damit der zugriff möglich wird
public class MultiArrowsController {
    @Autowired
    private MultiArrowsService multiArrowService;

    @GetMapping
    public List<MultiArrows> getAllMultiArrows(@RequestParam String collectionID){
        System.out.println("Looking for arrows with collectionID: " + collectionID);
        return multiArrowService.getAllMultiArrows(collectionID);
    }

    @PostMapping
    public MultiArrows createMultiArrow(@RequestBody MultiArrows multiArrow) {
        return multiArrowService.createMultiArrow(multiArrow);
    }

    //Der @RequestBody übernimmt die Konvertierung des JSON-Arrays in eine List<MultiArrows> mithilfe von Jackson
    @PutMapping
    public void updateMultiArrows(@RequestBody List<MultiArrows> updatedMultiArrows) {
        System.out.println("update multiarrow: "  + updatedMultiArrows.toString());
        multiArrowService.updateMultiArrows(updatedMultiArrows);
    }

    @GetMapping("/{id}")
    public MultiArrows getMultiArrowById(@PathVariable String id) {
        return multiArrowService.getMultiArrowById(id);
    }

    @PutMapping("/{id}")
    public MultiArrows updateMultiArrowById(@PathVariable String id, @RequestBody MultiArrows updatedMultiArrow) {
        System.out.println("update multiarrow: " + id + updatedMultiArrow.toString());
        return multiArrowService.updateMultiArrowById(id, updatedMultiArrow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMultiArrowById(@PathVariable String id) {
        multiArrowService.deleteMultiArrowById(id);
        return ResponseEntity.noContent().build();
    }

}

