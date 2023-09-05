package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterTeachersThirst;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RegisterTeachersThirstRepository extends JpaRepository<RegisterTeachersThirst, Integer> {

    @Query("SELECT tt FROM RegisterTeachersThirst tt WHERE tt.registerTeacher.id = :idTeacher")
    List<RegisterTeachersThirst> findByIdTeacher(@Param("idTeacher") Integer idTeacher);

    @Modifying
    @Transactional
    @Query("DELETE FROM RegisterTeachersThirst tt WHERE tt.registerTeacher.id = :idTeacher")
    void deleteByIdTeacher(@Param("idTeacher") Integer idTeacher);
}
