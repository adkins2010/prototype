package com.allstate.ars.compozed.roadio.domain.beans;

//import javax.faces.bean.ManagedBean;

//@ManagedBean(name = "locationBean", eager = true)
public class LocationManagedBean {
    Double latitude = 35.30636737274465;
    Double longitude = -80.76664034949033;

    public LocationManagedBean() {
    }

    public LocationManagedBean(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
