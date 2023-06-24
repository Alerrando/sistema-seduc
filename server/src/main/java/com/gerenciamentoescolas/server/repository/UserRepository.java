package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
