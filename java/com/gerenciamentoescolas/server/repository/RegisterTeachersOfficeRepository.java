package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterTeachersOffice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RegisterTeachersOfficeRepository extends JpaRepository<RegisterTeachersOffice, Integer> {
    @Query("SELECT to FROM RegisterTeachersOffice to WHERE to.registerTeacher.id = :teacherId")
    List<RegisterTeachersOffice> findByTeacherId(@Param("teacherId") Integer teacherId);

    @Modifying
    @Transactional
    @Query("DELETE FROM RegisterTeachersOffice to WHERE to.registerTeacher.id = :idTeacher")
    void deleteByIdTeacher(@Param("idTeacher") Integer idTeacher);
}
