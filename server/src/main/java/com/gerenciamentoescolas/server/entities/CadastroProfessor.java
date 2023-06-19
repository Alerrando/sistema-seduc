package com.gerenciamentoescolas.server.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cadastro_professor")
public class CadastroProfessor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String cpf;
    private Integer cadastroEscola;
    private String sede;
    public CadastroProfessor(){
    }

    public CadastroProfessor(Integer id, String name, String cpf, Integer cadastroEscola, String sede){
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.cadastroEscola = cadastroEscola;
        this.sede = sede;
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

    public Integer getCadastroEscola(){
        return cadastroEscola;
    }

    public void setCadastroEscola(Integer cadastroEscola){
        this.cadastroEscola = cadastroEscola;
    }

    public String getSede(){
        return sede;
    }

    public void setSede(String sede){
        this.sede = sede;
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
