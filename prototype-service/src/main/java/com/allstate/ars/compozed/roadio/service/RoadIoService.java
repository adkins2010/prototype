package com.allstate.ars.compozed.roadio.service;

import com.allstate.ars.compozed.roadio.domain.ExampleRequestResponse;

public interface RoadIoService {
    ExampleRequestResponse saveExample(ExampleRequestResponse example);

    ExampleRequestResponse findOne(Long id);

}
