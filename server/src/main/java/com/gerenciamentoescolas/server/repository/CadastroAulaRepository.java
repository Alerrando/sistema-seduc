package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CadastroAulaRepository extends JpaRepository<CadastroAulas, Integer> {
    List<CadastroAulas> findByCadastroProfessor(Integer professorId);
}
