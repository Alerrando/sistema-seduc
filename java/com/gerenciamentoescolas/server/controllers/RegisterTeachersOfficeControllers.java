package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.entities.RegisterTeachersOffice;
import com.gerenciamentoescolas.server.services.RegisterTeachersOfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = { "http://192.168.0.78:3000", "http://www3.rancharia.sp.gov.br"})
@RestController
@RequestMapping(value = "/security/teachers-office")
public class RegisterTeachersOfficeControllers {
    @Autowired
    private RegisterTeachersOfficeService registerTeachersOfficeService;

    @GetMapping
    public List<RegisterTeachersOffice> findAll(){
        return registerTeachersOfficeService.findAll();
    }

    @GetMapping("/{teacherId}")
    public List<RegisterTeachersOffice> findById(@PathVariable Integer teacherId){
        return registerTeachersOfficeService.findById(teacherId);
    }

    @PostMapping("/{teacherId}")
    public void create(@PathVariable Integer teacherId, @RequestBody List<Integer> offices){
        registerTeachersOfficeService.create(teacherId, offices);
    }

    @PutMapping("/{teacherId}")
    public void edit(@PathVariable Integer teacherId, @RequestBody List<Integer> offices){
        registerTeachersOfficeService.edit(teacherId, offices);
    }
}
