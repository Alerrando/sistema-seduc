package com.gerenciamentoescolas.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.CadastroProfessor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CadastroProfessorRepository extends JpaRepository<CadastroProfessor, Integer> {
    boolean existsByCpf(String cpf);

    @Query("SELECT p FROM CadastroProfessor p WHERE p.name LIKE %:name%")
    List<CadastroProfessor> filterByName(@Param("name") String name);

    @Query("SELECT a.horaAulas, p.name,a.diaAula, a.cadastroEscola FROM CadastroProfessor p LEFT JOIN CadastroAulas a ON a.cadastroProfessor = :idProfessor WHERE a.diaAula BETWEEN :dataInicial AND :dataFinal GROUP BY a.horaAulas, p.name, a.diaAula, a.cadastroEscola")
    List<Object[]> findProfessorAulas(@Param("idProfessor") Integer idProfessor, @Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);
}
