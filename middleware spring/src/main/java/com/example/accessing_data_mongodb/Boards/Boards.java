package com.example.accessing_data_mongodb.Boards;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

//Definiere die Java-Klasse, die die Struktur der MongoDB-Collection abbildet.
//name have to be the same name as the mongodb collection, and the same name as the file
public class Boards {

    // id is standard name of mongodbid
    @Id
    public String id;
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
                id, boardName);
    }

    public Object getId() {
        return this.id;
    }

}
