package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.CadastroAulas;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CadastroAulaRepository extends JpaRepository<CadastroAulas, Integer> {

}
