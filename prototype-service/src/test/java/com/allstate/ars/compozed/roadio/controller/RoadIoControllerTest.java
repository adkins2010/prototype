package com.allstate.ars.compozed.roadio.controller;

import com.allstate.ars.compozed.roadio.constant.ExceptionConstants;
import com.allstate.ars.compozed.roadio.constant.RESTConstants;
import com.allstate.ars.compozed.roadio.domain.ExampleRequestResponse;
import com.allstate.ars.compozed.roadio.repository.RoadIoRepository;
import com.allstate.ars.compozed.util.JsonConverterUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RoadIoControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    RoadIoRepository roadIoRepository;

    String exampleString;

    private ExampleRequestResponse exampleRequestResponse;

    @Before
    public void setup() {
        exampleRequestResponse = new ExampleRequestResponse();
        exampleRequestResponse.setExample("example");
        exampleString = JsonConverterUtil.objectToString(exampleRequestResponse);
    }

    @Test
    @Transactional
    @Rollback
    public void postExample() throws Exception {

        MockHttpServletRequestBuilder request = post(RESTConstants.EXAMPLE_BASE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(exampleString);

        this.mockMvc.perform(request).andExpect(status().isCreated())
                .andExpect(jsonPath("$.correlationId").isNotEmpty())
                .andExpect(jsonPath("$.message", equalTo(HttpStatus.CREATED.getReasonPhrase())))
                .andExpect(jsonPath("$.status", equalTo(HttpStatus.CREATED.value())));
    }


    @Test
    @Transactional
    public void getExample() throws Exception {
        MockHttpServletRequestBuilder request = get(RESTConstants.EXAMPLE_BASE_URL +"/"+ roadIoRepository.save
                (exampleRequestResponse)
                .getGeneratedID())
                .contentType(MediaType.APPLICATION_JSON);

        this.mockMvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.correlationId").isNotEmpty())
                .andExpect(jsonPath("$.message", equalTo(HttpStatus.OK.getReasonPhrase())))
                .andExpect(jsonPath("$.status", equalTo(HttpStatus.OK.value())));
    }

    @Test
    @Transactional
    @Rollback
    public void postExampleThrowsBadRequest() throws Exception {
        MockHttpServletRequestBuilder request = post(RESTConstants.EXAMPLE_BASE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonConverterUtil.objectToString(new ExampleRequestResponse()));

        this.mockMvc.perform(request).andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.correlationId").isNotEmpty())
                .andExpect(jsonPath("$.message", equalTo(ExceptionConstants.BAD_REQUEST_DETAIL_MESSAGE)))
                .andExpect(jsonPath("$.status", equalTo(HttpStatus.BAD_REQUEST.value())));
    }

}
