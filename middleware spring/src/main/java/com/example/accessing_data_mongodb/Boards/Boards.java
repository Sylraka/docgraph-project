package com.example.accessing_data_mongodb.Boards;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.accessing_data_mongodb.ObjectIdDeserializer;
import com.example.accessing_data_mongodb.ObjectIdSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

//Definiere die Java-Klasse, die die Struktur der MongoDB-Collection abbildet.
//name have to be the same name as the mongodb collection, and the same name as the file
public class Boards {

    // id is standard name of mongodbid
    @Id
    @Field("_id") // Explizite Zuordnung zum MongoDB-Feld _id
    @JsonProperty("_id") // Beibehalten des Namens _id beim JSON-Serialisieren/Deserialisieren
    @JsonSerialize(using = ObjectIdSerializer.class) // Verwende den benutzerdefinierten Serializer
    @JsonDeserialize(using = ObjectIdDeserializer.class) // Für die Eingabe
    private ObjectId _id; // MongoDB ObjectId
    public String boardName;
    public String[] boardRubrics;
    public Object boardPosition;
    public Object[] linkList;
    public Object[] cardList;
    public Object[] arrowList;
    public Integer cardIDCounter;
    public Integer arrowIDCounter;
    public Integer anchorIDCounter;
    public String collectionID;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // Der parameterlose Konstruktor ist notwendig, damit Frameworks wie Spring die
    // Klasse instanziieren können,
    // z. B. beim Abrufen von Daten aus der Datenbank.
    public Boards() {
    }

    // Ermöglicht die direkte Erstellung einer Instanz mit dem Wert für
    public Boards(Boards board) {
        this.boardName = board.boardName;
        this.boardRubrics = board.boardRubrics;
        this.boardPosition = board.boardPosition;
        this.linkList = board.linkList;
        this.cardList = board.cardList;
        this.arrowList = board.arrowList;
        this.cardIDCounter = board.cardIDCounter;
        this.arrowIDCounter = board.arrowIDCounter;
        this.anchorIDCounter = board.anchorIDCounter;
        this.collectionID = board.collectionID;
    }

    public void setBoard(Boards board) {
        this.boardName = board.boardName;
        this.boardRubrics = board.boardRubrics;
        this.boardPosition = board.boardPosition;
        this.linkList = board.linkList;
        this.cardList = board.cardList;
        this.arrowList = board.arrowList;
        this.cardIDCounter = board.cardIDCounter;
        this.arrowIDCounter = board.arrowIDCounter;
        this.anchorIDCounter = board.anchorIDCounter;
        this.collectionID = board.collectionID;
    }

    public String getBoardName() {
        return this.boardName;
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
                "Collection[id=%s, boardName='%s']",
                _id, boardName);
    }

    public String getId() {
        return this._id.toString();
    }

}
