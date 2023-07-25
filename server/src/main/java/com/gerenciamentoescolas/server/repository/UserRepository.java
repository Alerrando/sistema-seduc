package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByRg(String rg);

    Optional<User> findByEmailAndPassword(String email, String password);

    @Query("SELECT u FROM User u WHERE u.mandatoryBulletin = 1")
    List<User> findByMandatoryBulletin();

    @Query("Select u from User u WHERE u.registerSchool.id  = :schoolId")
    User findUserBySchoolId(@Param("schoolId") Integer schoolId);
}
