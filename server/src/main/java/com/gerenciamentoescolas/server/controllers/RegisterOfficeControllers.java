package com.gerenciamentoescolas.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gerenciamentoescolas.server.entities.RegisterOffice;
import com.gerenciamentoescolas.server.services.RegisterOfficeService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/office")
public class RegisterOfficeControllers {
    @Autowired
    RegisterOfficeService registerOfficeService;

    @GetMapping
    public List<RegisterOffice> findAll(){
        return registerOfficeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegisterOffice> findById(@PathVariable Integer id){
        RegisterOffice registerOffice = registerOfficeService.findById(id);
        if(registerOffice != null){
            return ResponseEntity.ok(registerOffice);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public RegisterOffice create(@RequestBody RegisterOffice registerOffice){
        return registerOfficeService.create(registerOffice);
    }

    @PutMapping("/{id}")
    public RegisterOffice edit(@PathVariable Integer id, @RequestBody RegisterOffice registerOffice){
        return registerOfficeService.edit(id, registerOffice);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        registerOfficeService.delete(id);
    }
}
