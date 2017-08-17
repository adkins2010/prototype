package com.allstate.ars.compozed.roadio.controller;

import com.allstate.ars.compozed.aspect.Loggable;
import com.allstate.ars.compozed.roadio.constant.RESTConstants;
import com.allstate.ars.compozed.roadio.domain.ExampleRequestResponse;
import com.allstate.ars.compozed.roadio.exception.BadRequestException;
import com.allstate.ars.compozed.roadio.service.RoadIoService;
import com.allstate.ars.compozed.util.JsonConverterUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.http.HttpStatus;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(RESTConstants.EXAMPLE_BASE_URL)
public class RoadIoController {


    private final RoadIoService roadIoService;
    private static final Logger LOGGER = LoggerFactory.getLogger(RoadIoController.class);

    @Autowired
    private Tracer tracer;

    public RoadIoController(RoadIoService roadIoService) {
        this.roadIoService = roadIoService;
    }


    @Loggable
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExampleRequestResponse createExample(@Valid @RequestBody ExampleRequestResponse exampleRequestResponse, Errors errors){


        LOGGER.info("\nRequest UserDetails parameters: " + JsonConverterUtil.objectToString(exampleRequestResponse));

        checkValidationErrors(errors);

        //LOGIC FOR POST
        ExampleRequestResponse example = roadIoService.saveExample(exampleRequestResponse);
        example.setStandardResponseFields(HttpStatus.CREATED, tracer);

        return exampleRequestResponse;

    }

    @Loggable
    @GetMapping("/{id}")
    public ExampleRequestResponse getExample(@PathVariable Long id) {
        ExampleRequestResponse exampleRequestResponse = roadIoService.findOne(id);
        exampleRequestResponse.setStandardResponseFields(HttpStatus.OK, tracer);
        return exampleRequestResponse;
    }

    private void checkValidationErrors(Errors errors) {
        List<String> badRequestExceptions = new ArrayList<>();
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(error -> badRequestExceptions.add(error.getField().substring(0, 1).toUpperCase() + error.getField().substring(1) + " " + error.getDefaultMessage()));
            throw new BadRequestException(badRequestExceptions);

        }
    }

}
