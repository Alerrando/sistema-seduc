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
@Table(name = "cadastro_professor")
public class CadastroProfessor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String cpf;
    private String cargo;
    @ManyToOne
    @JoinColumn(name = "sede_teacher")
    private CadastroEscola sede;
    public CadastroProfessor(){
    }

    public CadastroProfessor(Integer id, String name, String cpf, CadastroEscola sede, String cargo){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.sede = sede;
        this.cargo = cargo;
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

    public CadastroEscola getSede(){
        return sede;
    }

    public void setSede(CadastroEscola sede){
        this.sede = sede;
    }

    public String getCargo(){
        return cargo;
    }

    public void setCargo(String cargo){
        this.cargo = cargo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CadastroProfessor that = (CadastroProfessor) o;
        return Objects.equals(cpf, that.cpf);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cpf);
    }
}
