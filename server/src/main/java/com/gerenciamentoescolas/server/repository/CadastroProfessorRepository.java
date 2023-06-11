package com.gerenciamentoescolas.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.CadastroProfessor;

public interface CadastroProfessorRepository extends JpaRepository<CadastroProfessor, Integer> {
    
}
