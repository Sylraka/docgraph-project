package com.example.accessing_data_mongodb.Boards;

import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface BoardProjection {
    String getBoardName();

    Object getBoardPosition();

    @Field("_id") // Gibt an, dass dieses Feld auf das MongoDB _id-Feld gemappt wird
    @JsonProperty("_id") // Beibehaltung des Namens _id beim JSON-Serialisieren
    String getId();

    String[] getBoardRubrics();

    Object[] getLinkList();
}
