package com.example.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.io.Serializable;

public class DeviceQueue implements Serializable {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("max_hourly_energy_consumption")
    private double max_hourly_energy_consumption;

    @JsonProperty("user_id")
    private Long user_id;

    @JsonProperty("method")
    private String method;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getMax_hourly_energy_consumption() {
        return max_hourly_energy_consumption;
    }

    public void setMax_hourly_energy_consumption(double max_hourly_energy_consumption) {
        this.max_hourly_energy_consumption = max_hourly_energy_consumption;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public DeviceQueue(Long id, double max_hourly_energy_consumption, Long user_id, String method) {
        this.id = id;
        this.max_hourly_energy_consumption = max_hourly_energy_consumption;
        this.user_id = user_id;
        this.method = method;
    }

    public DeviceQueue(){}
}
