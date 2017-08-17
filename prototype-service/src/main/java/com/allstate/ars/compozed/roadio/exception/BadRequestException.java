package com.allstate.ars.compozed.roadio.exception;

import java.util.ArrayList;
import java.util.List;


public class BadRequestException extends RuntimeException{

    private List<String> badRequestExceptionList = new ArrayList<>();

    public BadRequestException() {
        super();
    }

    public BadRequestException(String s) {
        badRequestExceptionList.add(s);
    }

    public BadRequestException(List<String> badRequestExceptionList) {
        this.badRequestExceptionList = badRequestExceptionList;
    }

    public List<String> getBadRequestExceptionList() {
        return badRequestExceptionList;
    }
}
