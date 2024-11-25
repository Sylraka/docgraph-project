package com.example.accessing_data_mongodb.MultiArrows;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

//Definiere die Java-Klasse, die die Struktur der MongoDB-Collection abbildet.
//name have to be the same name as the mongodb collection, and the same name as the file
@Document(collection = "multiarrows") // Weist Spring an, mit der "multiarrows"-Collection zu arbeiten
public class MultiArrows {

  // id is standard name of mongodbid
  @Id
  public String _id;
  public String arrowType;
  public Object anchorStart;
  public Object anchorEnd;
  public String collectionID;
  @CreatedDate
  private LocalDateTime createdAt;
  @LastModifiedDate
  private LocalDateTime updatedAt;


  // Der parameterlose Konstruktor ist notwendig, damit Frameworks wie Spring die
  // Klasse instanziieren können,
  // z. B. beim Abrufen von Daten aus der Datenbank.
  
  public MultiArrows() {
  }

  // Ermöglicht die direkte Erstellung einer Instanz mit dem Wert für
  // collectionName.
  public MultiArrows(MultiArrows MultiArrow) {
    this.arrowType = MultiArrow.arrowType;
    this.anchorStart = MultiArrow.anchorStart;
    this.anchorEnd = MultiArrow.anchorEnd;
    this.collectionID = MultiArrow.collectionID;
  }


  public void setMultiArrow(MultiArrows MultiArrow) {
    this.arrowType = MultiArrow.arrowType;
    this.anchorStart = MultiArrow.anchorStart;
    this.anchorEnd = MultiArrow.anchorEnd;
    this.collectionID = MultiArrow.collectionID;
}

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  @Override
  public String toString() {
    return String.format(
        "MultiArrow[id=%s]",
        _id);
  }

  public Object getId() {
    return this._id;
  }

}

