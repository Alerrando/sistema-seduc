package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterSchool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface CadastroEscolaRepository extends JpaRepository<RegisterSchool, Integer> {
    boolean existsByName(String name);

    @Query("SELECT p.id, p.name, a.diaAula, SUM(a.horaAulas), p.cargo FROM RegisterTeacher p LEFT JOIN RegisterLesson a ON p.id = a.cadastroProfessor.id WHERE p.sede = :schoolId AND a.diaAula BETWEEN :startDate AND :endDate GROUP BY p.id, p.name, a.diaAula, p.cargo")
    List<Object[]> findEscolasAulas(@Param("schoolId") Integer schoolId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
