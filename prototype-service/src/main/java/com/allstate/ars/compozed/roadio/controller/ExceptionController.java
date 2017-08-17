package com.allstate.ars.compozed.roadio.controller;

import com.allstate.ars.compozed.roadio.constant.ExceptionConstants;
import com.allstate.ars.compozed.roadio.domain.response.ErrorResponse;
import com.allstate.ars.compozed.roadio.exception.ApiException;
import com.allstate.ars.compozed.roadio.exception.BadRequestException;
import com.allstate.ars.compozed.roadio.exception.DuplicateRequestException;
import com.allstate.ars.compozed.roadio.exception.GoneRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Collections;

@RestControllerAdvice
public class ExceptionController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionController.class);

    @Autowired
    private Tracer tracer;

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    protected ErrorResponse handleBadRequest(BadRequestException ex) {
        LOGGER.info("BadRequestException statusCode : " + HttpStatus.BAD_REQUEST.value());
        return new ErrorResponse(ex.getBadRequestExceptionList(), ExceptionConstants.BAD_REQUEST_DETAIL_MESSAGE, HttpStatus.BAD_REQUEST.value(), Long.toHexString(tracer.getCurrentSpan().getTraceId()));
    }


    @ExceptionHandler(DuplicateRequestException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    protected ErrorResponse handleAlreadyExistsRequest(DuplicateRequestException ex) {
        LOGGER.info("DuplicateRequestException statusCode : " + HttpStatus.CONFLICT.value());
        return new ErrorResponse(Collections.singletonList(ex.getMessage()), ExceptionConstants.DUPLICATE_REQUEST_DETAIL_MESSAGE, HttpStatus.CONFLICT.value(), Long.toHexString(tracer.getCurrentSpan().getTraceId()));
    }

    @ExceptionHandler(GoneRequestException.class)
    @ResponseStatus(HttpStatus.GONE)
    protected ErrorResponse handleGoneRequest(GoneRequestException ex) {
        LOGGER.info("GoneRequestException statusCode : " + HttpStatus.GONE.value());
        return new ErrorResponse(Collections.singletonList(ex.getMessage()), ExceptionConstants.GONE_REQUEST_DETAIL_MESSAGE, HttpStatus.GONE.value(), Long.toHexString(tracer.getCurrentSpan().getTraceId()));
    }

    @ExceptionHandler({ApiException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected ErrorResponse handleInternalServerError(Exception ex) {
        LOGGER.info("Internal Server Error statusCode : " + HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ErrorResponse(Collections.singletonList(ex.getMessage()), ExceptionConstants.INTERNAL_SERVER_ERROR_DETAIL_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR.value(), Long.toHexString(tracer.getCurrentSpan().getTraceId()));
    }
}
