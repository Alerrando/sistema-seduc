package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterSchool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface RegisterSchoolRepository extends JpaRepository<RegisterSchool, Integer> {
    boolean existsByName(String name);

    @Query("SELECT t.id, t.name, l.lessonDay, SUM(l.amountTime) FROM RegisterTeacher t LEFT JOIN RegisterLesson l ON t.id = l.registerTeacher.id WHERE l.registerSchool.id = :schoolId AND l.lessonDay BETWEEN :startDate AND :endDate GROUP BY t.id, t.name, l.lessonDay")
    List<Object[]> findEscolasAulas(@Param("schoolId") Integer schoolId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
