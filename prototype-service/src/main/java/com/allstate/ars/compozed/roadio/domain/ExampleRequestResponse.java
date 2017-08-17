package com.allstate.ars.compozed.roadio.domain;

import com.allstate.ars.compozed.roadio.domain.response.AbstractResponse;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "example")
public class ExampleRequestResponse extends AbstractResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ID")
//    @SequenceGenerator(name = "ID", sequenceName = "ID", allocationSize = 1)
//    @Column(name = "id")
//    @ApiModelProperty(hidden = true)
    private Long generatedID;

    @NotEmpty
    private String example;

    public Long getGeneratedID() {
        return generatedID;
    }

    public void setGeneratedID(Long generatedID) {
        this.generatedID = generatedID;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }
}
