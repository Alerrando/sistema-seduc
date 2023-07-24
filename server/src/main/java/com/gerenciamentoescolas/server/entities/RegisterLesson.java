package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "cadastro_aulas")
public class CadastroAulas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "teacher_Id")
    private CadastroProfessor cadastroProfessor;
    private Integer horaAulas;
    @Temporal(TemporalType.TIMESTAMP)
    private Date diaAula;
    @ManyToOne
    @JoinColumn(name = "school_id")
    private CadastroEscola cadastroEscola;

    public CadastroAulas(){
    }

    public CadastroAulas(Integer id, CadastroProfessor cadastroProfessor, Integer horaAulas, Date diaAula, CadastroEscola cadastroEscola) {
        this.id = id;
        this.cadastroProfessor = cadastroProfessor;
        this.horaAulas = horaAulas;
        this.diaAula = diaAula;
        this.cadastroEscola = cadastroEscola;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public CadastroProfessor getCadastroProfessor() {
        return cadastroProfessor;
    }

    public void setCadastroProfessor(CadastroProfessor cadastroProfessor) {
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

    public CadastroEscola getCadastroEscola() {
        return cadastroEscola;
    }

    public void setCadastroEscola(CadastroEscola cadastroEscola) {
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
