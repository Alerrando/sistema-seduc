package com.gerenciamentoescolas.server.controllers;

import com.gerenciamentoescolas.server.dto.RegisterSchoolDTO;
import com.gerenciamentoescolas.server.entities.RegisterSchool;
import com.gerenciamentoescolas.server.services.RegisterSchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/security/cadastro-escola")
public class RegisterSchoolControllers {
    @Autowired
    private RegisterSchoolService registerSchoolService;

    @GetMapping
    public List<RegisterSchool> findAll(){
        List<RegisterSchool> result = registerSchoolService.findAll();
        return result;
    }

    @GetMapping("/relatorio/{schoolId}&{startDate}&{endDate}")
    public List<RegisterSchoolDTO> findEscolasAulas(@PathVariable String schoolId, @PathVariable Date startDate, @PathVariable Date endDate){
        List<RegisterSchoolDTO> result = registerSchoolService.findEscolasAulas(schoolId, startDate, endDate);
        return result;
    }

    @PostMapping
    public RegisterSchool create(@RequestBody RegisterSchool registerSchool){
        return registerSchoolService.create(registerSchool);
    }

    @PutMapping("/{id}")
    public RegisterSchool edit(@PathVariable Integer id, @RequestBody RegisterSchool registerSchool){
        return registerSchoolService.edit(id, registerSchool);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        registerSchoolService.delete(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegisterSchool> findById(@PathVariable Integer id) {
        RegisterSchool escola = registerSchoolService.findById(id);
        if (escola != null) {
            return ResponseEntity.ok(escola);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
