package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterLesson;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RegisterLessonRepository extends JpaRepository<RegisterLesson, Integer> {
    @Query("SELECT a FROM RegisterLesson a WHERE a.registerTeacher.id IN (:professorIds)")
    List<RegisterLesson> findByCadastroProfessor(@Param("professorIds") List<Integer> professorIds);
}
