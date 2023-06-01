package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "cadastro_aulas")
public class CadastroAulas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nomeProfessor;
    private Integer quantAulas;
    private String titularidade;
    private String escola;

    public CadastroAulas(){
    }

    public CadastroAulas(Integer id, String nomeProfessor, Integer quantAulas, String titularidade, String escola) {
        this.id = id;
        this.nomeProfessor = nomeProfessor;
        this.quantAulas = quantAulas;
        this.titularidade = titularidade;
        this.escola = escola;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeProfessor() {
        return nomeProfessor;
    }

    public void setNomeProfessor(String nomeProfessor) {
        this.nomeProfessor = nomeProfessor;
    }

    public Integer getQuantAulas() {
        return quantAulas;
    }

    public void setQuantAulas(Integer quantAulas) {
        this.quantAulas = quantAulas;
    }

    public String getTitularidade() {
        return titularidade;
    }

    public void setTitularidade(String titularidade) {
        this.titularidade = titularidade;
    }

    public String getEscola() {
        return escola;
    }

    public void setEscola(String escola) {
        this.escola = escola;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CadastroAulas that = (CadastroAulas) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
