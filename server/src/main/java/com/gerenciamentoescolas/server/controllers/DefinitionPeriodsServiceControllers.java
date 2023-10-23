package com.gerenciamentoescolas.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gerenciamentoescolas.server.entities.DefinitionPeriods;
import com.gerenciamentoescolas.server.services.DefinitionPeriodsService;

@CrossOrigin(origins = { "http://192.168.0.78:3000", "http://www3.rancharia.sp.gov.br"})
@RestController
@RequestMapping(value = "/security/definition-periods")
public class DefinitionPeriodsServiceControllers {
    @Autowired
    DefinitionPeriodsService definitionPeriodsService;
    
    @GetMapping
    public List<DefinitionPeriods> findAll(){
        return definitionPeriodsService.findAll();
    }

    @PostMapping
    public DefinitionPeriods create(@RequestBody DefinitionPeriods definitionPeriods){
        return definitionPeriodsService.create(definitionPeriods);
    }
}
