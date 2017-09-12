package com.allstate.ars.compozed.stepDefinitions;

import com.allstate.ars.compozed.roadio.RoadIoApplication;
import com.allstate.ars.compozed.roadio.constant.RESTConstants;
import com.allstate.ars.compozed.roadio.domain.ExampleRequestResponse;
import com.allstate.ars.compozed.roadio.repository.RoadIoRepository;
import cucumber.api.java.Before;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@SpringBootTest
@ContextConfiguration(classes = RoadIoApplication.class)
@AutoConfigureMockMvc
public class RoadIoStepdefs {

//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private RoadIoRepository roadIoRepository;
//
//    private MockHttpServletResponse latestResult;
//
//    private ExampleRequestResponse exampleRequestResponse;
//
//
//    @Before
//    public void before() {
//        latestResult = null;
//    }
//
//    @Given("^An example object exist in the database with example value \"([^\"]*)\"$")
//    public void anExampleObjectExistInTheDatabaseWithExampleValue(String exampleString) throws Throwable {
//         exampleRequestResponse = new ExampleRequestResponse();
//        exampleRequestResponse.setExample(exampleString);
//        roadIoRepository.save(exampleRequestResponse);
//    }
//
//    @When("^the client makes a GET request with the example objects ID$")
//    public void theClientMakesAGETRequestWith() throws Throwable {
//        MockHttpServletRequestBuilder request = get(RESTConstants.EXAMPLE_BASE_URL + "/" + exampleRequestResponse.getGeneratedID())
//                .contentType(MediaType.APPLICATION_JSON);
//
//        latestResult = this.mockMvc.perform(request)
//                .andReturn()
//                .getResponse();
//    }
//
//    @Then("^the client receives status code of (\\d+)$")
//    public void theClientReceivesStatusCodeOf(int status) throws Throwable {
//        assertThat(latestResult.getStatus(), is(status));
//    }
//
//    @And("^the response has a example field matching: \"([^\"]*)\"$")
//    public void theResponseHasAExampleFieldMatchingExample(String exampleString) throws Throwable {
//        String response = latestResult.getContentAsString();
//        JSONObject json = new JSONObject(response);
//        assertThat(json.get("example"), is(exampleString));
//    }


}
