package com.gerenciamentoescolas.server.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "register_teacher")
public class RegisterTeacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String cpf;
    private String office;
    @ManyToOne
    @JoinColumn(name = "thirst_teacher")
    private RegisterSchool thirst;
    private Boolean inactive;

    public RegisterTeacher(){
    }

    public RegisterTeacher(Integer id, String name, String cpf, RegisterSchool thirst, String office, Boolean inactive){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.thirst = thirst;
        this.office = office;
        this.inactive = inactive;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public RegisterSchool getThirst() {
        return thirst;
    }

    public void setThirst(RegisterSchool thirst) {
        this.thirst = thirst;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public Boolean getInactive(){
        return inactive;
    }

    public void setInactive(Boolean inactive) {
        this.inactive = inactive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RegisterTeacher that = (RegisterTeacher) o;
        return Objects.equals(cpf, that.cpf);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cpf);
    }
}
