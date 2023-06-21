package com.gerenciamentoescolas.server.dto;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;
import java.util.List;

public class CadastroProfessorDTO {
    private Integer horaAulas;
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAula;
    private String cadastroEscola;

    public CadastroProfessorDTO(){
    }

    public CadastroProfessorDTO(Integer horaAulas, String name, Date dataAula, String cadastroEscola) {
        this.horaAulas = horaAulas;
        this.name = name;
        this.dataAula = dataAula;
        this.cadastroEscola = cadastroEscola;
    }



    public Integer getHoraAulas() {
        return horaAulas;
    }

    public void setHoraAulas(Integer horaAulas) {
        this.horaAulas = horaAulas;
    }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public Date getDataAula() {
        return dataAula;
    }

    public void setDataAula(Date datasAula) {
        this.dataAula = datasAula;
    }

    public String getCadastroEscola(){
        return cadastroEscola;
    }

    public void setCadastroEscola(String cadastroEscola){
        this.cadastroEscola = cadastroEscola;
    }
}
