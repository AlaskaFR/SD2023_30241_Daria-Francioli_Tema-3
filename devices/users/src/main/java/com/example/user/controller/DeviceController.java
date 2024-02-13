package com.example.user.controller;

import com.example.user.model.Device;
import com.example.user.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/devices")
public class DeviceController {
    private DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService){
        this.deviceService = deviceService;
    }

    @GetMapping()
    public ResponseEntity<?> getAll()
    {
        return new ResponseEntity<>(deviceService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id)
    {
        return new ResponseEntity<>(deviceService.findById(id), HttpStatus.OK);
    }



    @PostMapping()
    public ResponseEntity<?> insert(@RequestBody Device device)
    {
        return new ResponseEntity<>(deviceService.insert(device), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody Device device)
    {
        return new ResponseEntity<>(deviceService.update(id, device), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id)
    {
        deviceService.delete(id);
        return new ResponseEntity<>("Deleted device with id " + id, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserDevices(@PathVariable("userId") Long userId) {
        List<Device> devices = deviceService.getUserDevices(userId);
        return new ResponseEntity<>(devices, HttpStatus.OK);
    }
}