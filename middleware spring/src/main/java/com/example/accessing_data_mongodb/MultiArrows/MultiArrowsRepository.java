package com.example.accessing_data_mongodb.MultiArrows;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.accessing_data_mongodb.Boards.Boards;

//CustomerRepository extends the MongoRepository interface and plugs in the type of values and ID that it works with: 
//Customer and String, respectively. 
//This interface comes with many operations, including standard CRUD operations (create, read, update, and delete).
//Das Repository erlaubt dir, mit der MongoDB-Datenbank zu interagieren.
@Repository
public interface MultiArrowsRepository extends MongoRepository<MultiArrows, String> {


  public List<MultiArrows> findByCollectionID(String collectionID);
}

