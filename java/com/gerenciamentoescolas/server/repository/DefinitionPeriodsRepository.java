package com.gerenciamentoescolas.server.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.DefinitionPeriods;

public interface DefinitionPeriodsRepository extends JpaRepository<DefinitionPeriods, Date> {
    
}
