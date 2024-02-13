package com.example.user.service;


import com.example.user.model.Device;
import com.example.user.model.DeviceQueue;
import com.example.user.repository.DeviceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DeviceService {

    DeviceRepository deviceRepository;

    @Autowired
    private final RabbitTemplate template;

    public List<Device> findAll() {
        List<Device> devices = deviceRepository.findAll();
        return devices;
    }



    public Device findById(Long id) {
        Optional<Device> deviceOptional = deviceRepository.findById(id);
        if (!deviceOptional.isPresent()) {
            throw new RuntimeException(Device.class.getSimpleName() + " with id: " + id);
        }
        return deviceOptional.get();
    }

    public Device insert(Device device  ) {
        Device newDevice = deviceRepository.save(device);
        if(newDevice==null)
        {
            System.out.println("error");
        }

        publishDevice(device, "insert");
        return newDevice;
    }

    public Device update(Long id, Device device) {
        Optional<Device> deviceOptional = deviceRepository.findById(id);
        if(deviceOptional.isEmpty()){
            return null;
        }
        Device updateDevice = deviceOptional.get();
        updateDevice.setAddress(device.getAddress());
        updateDevice.setDescription(device.getDescription());
        updateDevice.setMax_hourly_energy_consumption(device.getMax_hourly_energy_consumption());
        updateDevice.setUserId(device.getUserId());
        updateDevice = deviceRepository.save(updateDevice);

        publishDevice(updateDevice, "update");
        return updateDevice;
    }

    public Device delete(Long id) {
        Device deleteDevice = findById(id);
        if (deleteDevice!=null)
        {
            deviceRepository.delete(deleteDevice);
        }

        publishDevice(deleteDevice, "delete");
        return deleteDevice;
    }

    public List<Device> getUserDevices (Long userId)
    {
        List<Device> list = deviceRepository.findAllByUserId(userId);
        return  list;
    }

    public void publishDevice(Device device, String method){
        try{
            ObjectMapper objectMapper = new ObjectMapper();

            DeviceQueue deviceQueue = new DeviceQueue(device.getId(), device.getMax_hourly_energy_consumption(), device.getUserId(), method);

            String json = objectMapper.writeValueAsString(deviceQueue);

            template.convertAndSend("queue-device",json);
            System.out.println("Device sent to queue" + json);

        }catch(JsonProcessingException e){
            System.out.println("Error while sending to queue");

        }

    }
}
