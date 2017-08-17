package com.allstate.ars.compozed.roadio.domain.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.http.HttpStatus;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "status",
        "message",
        "correlationId"
})
public abstract class AbstractResponse {

    int status;
    String message;
    String correlationId;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }


    public void setStandardResponseFields(HttpStatus httpStatus, Tracer tracer) {
        this.correlationId = Long.toHexString(tracer.getCurrentSpan().getTraceId());
        this.message = httpStatus.getReasonPhrase();
        this.status = httpStatus.value();
    }
}