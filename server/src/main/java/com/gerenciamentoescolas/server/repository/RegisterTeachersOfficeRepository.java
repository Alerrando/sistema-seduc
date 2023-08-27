package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterTeachersOffice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeachersOfficeRepository extends JpaRepository<RegisterTeachersOffice, Integer> {
    @Query("SELECT to FROM RegisterTeachersOffice to WHERE to.registerTeacher.id = :teacherId")
    List<RegisterTeachersOffice> findByTeacherId(@Param("teacherId") Integer teacherId);
}
