package com.example.user.repository;

import com.example.user.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    public List<Device> findAllByUserId(Long userId);
}
