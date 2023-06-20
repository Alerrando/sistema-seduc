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

    @Query("SELECT p.id, a.hora_aulas,a.dia_aula FROM cadastro_professor p LEFT JOIN cadastro_aulas a ON a.cadastro_professor = :idProfessor WHERE a.dia_aula BETWEEN :dataInicial AND :dataFinal GROUP BY p.id, a.hora_aulas,a.dia_aula")
    List<Object[]> findProfessorAulas(@Param("idProfessor") String idProfessor, @Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);
}
