package com.example.accessing_data_mongodb.MultiArrows;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.example.accessing_data_mongodb.ObjectIdDeserializer;
import com.example.accessing_data_mongodb.ObjectIdSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Optional;

//Definiere die Java-Klasse, die die Struktur der MongoDB-Collection abbildet.
//name have to be the same name as the mongodb collection, and the same name as the file
@Document(collection = "multiarrows") // Weist Spring an, mit der "multiarrows"-Collection zu arbeiten
public class MultiArrows {

    // id is standard name of mongodbid

    // public String _id;
    // @JsonProperty("_id")
    @Id
    @Field("id")
    @JsonSerialize(using = ObjectIdSerializer.class) // Verwende den benutzerdefinierten Serializer
    @JsonDeserialize(using = ObjectIdDeserializer.class) // Für die Eingabe
    private ObjectId _id; // MongoDB ObjectId
    public Object anchorStart;
    public Object anchorEnd;
    public String collectionID;
    // @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    // @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
    @JsonProperty("__v")
    private int version;

    // Der parameterlose Konstruktor ist notwendig, damit Frameworks wie Spring die
    // Klasse instanziieren können,
    // z. B. beim Abrufen von Daten aus der Datenbank.

    public MultiArrows() {
    }

    // Ermöglicht die direkte Erstellung einer Instanz mit dem Wert für
    // collectionName.
    public MultiArrows(MultiArrows MultiArrow) {
        this.anchorStart = MultiArrow.anchorStart;
        this.anchorEnd = MultiArrow.anchorEnd;
        this.collectionID = MultiArrow.collectionID;
        this.version = MultiArrow.version;
        this._id = MultiArrow._id;
    }

    public void setMultiArrow(MultiArrows MultiArrow) {
        this.anchorStart = MultiArrow.anchorStart;
        this.anchorEnd = MultiArrow.anchorEnd;
        this.collectionID = MultiArrow.collectionID;
        this.version = MultiArrow.version;
        this._id = MultiArrow._id;
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

    public String getId() {
        return this._id.toString();
    }

}
