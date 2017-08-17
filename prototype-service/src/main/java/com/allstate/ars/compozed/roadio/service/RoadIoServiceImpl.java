package com.allstate.ars.compozed.roadio.service;

import com.allstate.ars.compozed.aspect.Loggable;
import com.allstate.ars.compozed.roadio.domain.ExampleRequestResponse;
import com.allstate.ars.compozed.roadio.repository.RoadIoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class RoadIoServiceImpl implements RoadIoService {

    private final RoadIoRepository roadIoRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(RoadIoService.class);

    public RoadIoServiceImpl(RoadIoRepository roadIoRepository) {
        this.roadIoRepository = roadIoRepository;
    }

    @Override
    @Loggable
    public ExampleRequestResponse saveExample(ExampleRequestResponse example) {
        //LOGIC FOR POST
        return roadIoRepository.save(example);
    }

    @Override
    @Loggable
    public ExampleRequestResponse findOne(Long id) {
        return roadIoRepository.findOne(id);
    }

}
