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
    private String name;
    private Integer horaAulas;
    @Temporal(TemporalType.TIMESTAMP)
    private Date diaAula;
    private String titularidade;
    private String escola;

    public CadastroAulas(){
    }

    public CadastroAulas(Integer id, String name, Integer horaAulas, Date diaAula, String titularidade, String escola) {
        this.id = id;
        this.name = name;
        this.horaAulas = horaAulas;
        this.diaAula = diaAula;
        this.titularidade = titularidade;
        this.escola = escola;
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
