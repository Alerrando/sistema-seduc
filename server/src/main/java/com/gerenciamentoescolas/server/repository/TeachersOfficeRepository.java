package com.gerenciamentoescolas.server.repository;

import com.gerenciamentoescolas.server.entities.RegisterTeachersOffice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeachersOfficeRepository extends JpaRepository<RegisterTeachersOffice, Integer> {

}
