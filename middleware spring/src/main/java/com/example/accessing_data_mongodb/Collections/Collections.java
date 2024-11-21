package com.example.accessing_data_mongodb.Collections;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

//Definiere die Java-Klasse, die die Struktur der MongoDB-Collection abbildet.
//name have to be the same name as the mongodb collection, and the same name as the file
public class Collections {

  // id is standard name of mongodbid
  @Id
  public String id;

  public String collectionName;

  @CreatedDate
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;

  // Der parameterlose Konstruktor ist notwendig, damit Frameworks wie Spring die
  // Klasse instanziieren können,
  // z. B. beim Abrufen von Daten aus der Datenbank.
  public Collections() {
  }

  // Ermöglicht die direkte Erstellung einer Instanz mit dem Wert für
  // collectionName.
  public Collections(String collectionName) {
    this.collectionName = collectionName;
  }

  public String getCollectionName() {
    return this.collectionName;
  }
  public void setCollectionName(String collectionName) {
    this.collectionName = collectionName;
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
        "Collection[id=%s, collectionName='%s']",
        id, collectionName);
  }

}