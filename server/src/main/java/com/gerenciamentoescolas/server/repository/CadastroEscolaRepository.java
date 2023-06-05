package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.CadastroEscola;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CadastroEscolaRepository extends JpaRepository<CadastroEscola, Integer> {

}
