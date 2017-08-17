package com.allstate.ars.compozed.roadio.domain.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "status",
        "message",
        "validationErrors",
        "correlationId"
})
public class ErrorResponse {

    @JsonProperty("validationErrors")
    private List<String> errorList = new ArrayList<>();

    @JsonProperty("message")
    private String errorMessage;

    @JsonProperty("status")
    private int status;

    @JsonProperty("correlationId")
    private String correlationId;

    public ErrorResponse() {
        //Jackson needs the default constructor (fixes code smell by adding a comment)
    }

    public ErrorResponse(List<String> errorsList, String errorMessage, int status, String correlationId) {
        this.errorList  = errorsList;
        this.status = status;
        this.correlationId = correlationId;
        this.errorMessage = errorMessage;
    }

    public List<String> getErrorList() {
        return errorList;
    }

    public void setErrorList(List<String> errorList) {
        this.errorList = errorList;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }
}
