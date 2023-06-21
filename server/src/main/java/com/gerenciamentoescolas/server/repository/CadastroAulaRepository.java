package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.CadastroAulas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CadastroAulaRepository extends JpaRepository<CadastroAulas, Integer> {
    @Query("SELECT a FROM CadastroAulas a WHERE a.cadastroProfessor IN (:professorIds)")
    List<CadastroAulas> findByCadastroProfessor(@Param("professorIds") List<Integer> professorIds);

    @Query("SELECT a FROM CadastroAulas a WHERE a.cadastroProfessor LIKE %:id%")
    List<CadastroAulas> filterById(@Param("id") Integer id);
}
