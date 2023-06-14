package com.gerenciamentoescolas.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CadastroProfessorRepository extends JpaRepository<CadastroProfessor, Integer> {
    boolean existsByName(String name);

    @Query("SELECT p FROM CadastroProfessor p WHERE p.name = :name")
    List<CadastroProfessor> filterByName(@Param("name") String name);
}
