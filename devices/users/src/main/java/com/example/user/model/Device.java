package com.example.user.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "DEVICE")
@Data
public class Device{
    public Device() {
    }

    public Device(Long id, String description, String address, double max_hourly_energy_consumption, Long userId) {
        this.id = id;
        this.description = description;
        this.address = address;
        this.max_hourly_energy_consumption = max_hourly_energy_consumption;
        this.userId = userId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "max_hourly_energy_consumption", nullable = false)
    private double max_hourly_energy_consumption;

    @Column(name = "userId", nullable = false)
    private Long userId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getMax_hourly_energy_consumption() {
        return max_hourly_energy_consumption;
    }

    public void setMax_hourly_energy_consumption(double max_hourly_energy_consumption) {
        this.max_hourly_energy_consumption = max_hourly_energy_consumption;
    }
}
