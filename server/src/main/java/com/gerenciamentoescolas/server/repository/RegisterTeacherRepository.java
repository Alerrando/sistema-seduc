package com.gerenciamentoescolas.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CadastroProfessorRepository extends JpaRepository<RegisterTeacher, Integer> {
    boolean existsByCpf(String cpf);

    @Query("SELECT p FROM RegisterTeacher p WHERE p.name LIKE %:name%")
    List<RegisterTeacher> filterByName(@Param("name") String name);

    @Query("SELECT a.horaAulas, p.name,a.diaAula, a.cadastroEscola FROM RegisterTeacher p LEFT JOIN RegisterLesson a ON a.cadastroProfessor.id = :idProfessor WHERE a.diaAula BETWEEN :dataInicial AND :dataFinal GROUP BY a.horaAulas, p.name, a.diaAula, a.cadastroEscola")
    List<Object[]> findProfessorAulas(@Param("idProfessor") Integer idProfessor, @Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);
}
