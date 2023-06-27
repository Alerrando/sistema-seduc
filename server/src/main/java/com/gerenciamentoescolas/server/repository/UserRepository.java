package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByRg(String rg);

    Optional<User> findByEmailAndPassword(String email, String password);
}
