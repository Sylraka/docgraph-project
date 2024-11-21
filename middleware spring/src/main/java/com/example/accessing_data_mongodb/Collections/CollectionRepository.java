package com.example.accessing_data_mongodb.Collections;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//CustomerRepository extends the MongoRepository interface and plugs in the type of values and ID that it works with: 
//Customer and String, respectively. 
//This interface comes with many operations, including standard CRUD operations (create, read, update, and delete).
//Das Repository erlaubt dir, mit der MongoDB-Datenbank zu interagieren.
@Repository
public interface CollectionRepository extends MongoRepository<Collections, String> {

  public Collections findByCollectionName(String collectionName);
  //public List<Collection> findByLastName(String lastName);


}

