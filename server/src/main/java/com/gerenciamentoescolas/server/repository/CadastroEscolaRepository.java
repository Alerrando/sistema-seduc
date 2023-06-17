package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.dto.CadastroEscolaDTO;
import com.gerenciamentoescolas.server.entities.CadastroEscola;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CadastroEscolaRepository extends JpaRepository<CadastroEscola, Integer> {
    boolean existsByName(String name);

    @Query("SELECT e.id, e.name, SUM(a.horaAulas) FROM CadastroEscola e LEFT JOIN CadastroAulas a ON a.cadastroEscola = e.id GROUP BY e.id, e.name")
    List<Object[]> findEscolasAulas();
}
