package com.allstate.ars.compozed.roadio.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
public class Coordinate implements Serializable {
    @Getter @Setter
    Double latitude;
    @Getter @Setter
    Double longitude;
}
