package com.gerenciamentoescolas.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gerenciamentoescolas.server.entities.DefinitionPeriods;
import com.gerenciamentoescolas.server.repository.DefinitionPeriodsRepository;

@Service
public class DefinitionPeriodsService {
    @Autowired
    DefinitionPeriodsRepository definitionPeriodsRepository;

    public List<DefinitionPeriods> findAll(){
        List<DefinitionPeriods> results =  definitionPeriodsRepository.findAll();
        return results;
    }

    public DefinitionPeriods create(DefinitionPeriods definitionPeriods){
        return definitionPeriodsRepository.save(definitionPeriods);
    }
}
