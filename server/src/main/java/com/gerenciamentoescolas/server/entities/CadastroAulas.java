package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "cadastro_aulas")
public class CadastroAulas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JoinColumn(name = "name")
    private Integer cadastroProfessor;
    private Integer horaAulas;
    @Temporal(TemporalType.TIMESTAMP)
    private Date diaAula;
    private String titularidade;
    @JoinColumn(name = "escola")
    private Integer cadastroEscola;

    public CadastroAulas(){
    }

    public CadastroAulas(Integer id, Integer cadastroProfessor, Integer horaAulas, Date diaAula, String titularidade, Integer cadastroEscola) {
        this.id = id;
        this.cadastroProfessor = cadastroProfessor;
        this.horaAulas = horaAulas;
        this.diaAula = diaAula;
        this.titularidade = titularidade;
        this.cadastroEscola = cadastroEscola;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCadastroProfessor() {
        return cadastroProfessor;
    }

    public void setCadastroProfessor(Integer cadastroProfessor) {
        this.cadastroProfessor = cadastroProfessor;
    }

    public Integer getHoraAulas() {
        return horaAulas;
    }

    public void setHoraAulas(Integer horaAulas) {
        this.horaAulas = horaAulas;
    }

    public Date getDiaAula() {
        return diaAula;
    }

    public void setDiaAula(Date diaAula) {
        this.diaAula = diaAula;
    }

    public String getTitularidade() {
        return titularidade;
    }

    public void setTitularidade(String titularidade) {
        this.titularidade = titularidade;
    }

    public Integer getCadastroEscola() {
        return cadastroEscola;
    }

    public void setCadastroEscola(Integer cadastroEscola) {
        this.cadastroEscola = cadastroEscola;
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
