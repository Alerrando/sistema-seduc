package com.gerenciamentoescolas.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gerenciamentoescolas.server.entities.RegisterOffice;

public interface RegisterOfficeRepository extends JpaRepository<RegisterOffice, Integer> {
    boolean existsByName(String name);
}
