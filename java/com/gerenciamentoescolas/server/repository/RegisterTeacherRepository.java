package com.gerenciamentoescolas.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.RegisterTeacher;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface RegisterTeacherRepository extends JpaRepository<RegisterTeacher, Integer> {
    boolean existsByCpf(String cpf);

    @Query("SELECT t FROM RegisterTeacher t WHERE t.name LIKE %:name%")
    List<RegisterTeacher> filterByName(@Param("name") String name);

    @Query("SELECT l.amountTime, t.name, l.lessonDay, l.registerSchool, SUM(l.amountTime) FROM RegisterTeacher t LEFT JOIN RegisterLesson l ON l.registerTeacher.id = t.id WHERE l.registerTeacher.id = :idProfessor AND l.lessonDay BETWEEN :dataInicial AND :dataFinal GROUP BY l.amountTime, t.name, l.lessonDay, l.registerSchool")
    List<Object[]> findProfessorAulas(@Param("idProfessor") Integer idProfessor, @Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);


}
