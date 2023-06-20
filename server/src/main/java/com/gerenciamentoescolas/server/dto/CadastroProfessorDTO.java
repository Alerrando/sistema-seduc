package com.gerenciamentoescolas.server.dto;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;
import java.util.List;

public class CadastroProfessorDTO {
    private Long id;
    private String name;
    private Long horaAulas;
    @Temporal(TemporalType.TIMESTAMP)
    private List<Date> datasAulas;
    private String cadastroEscola;

    public CadastroProfessorDTO(){
    }

    public CadastroProfessorDTO(Long id, String name, Long horaAulas, List<Date> datasAulas, String cadastroEscola) {
        this.id = id;
        this.name = name;
        this.horaAulas = horaAulas;
        this.datasAulas = datasAulas;
        this.cadastroEscola = cadastroEscola;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getHoraAulas() {
        return horaAulas;
    }

    public void setHoraAulas(Long horaAulas) {
        this.horaAulas = horaAulas;
    }

    public List<Date> getDatasAulas() {
        return datasAulas;
    }

    public void setDatasAulas(List<Date> datasAulas) {
        this.datasAulas = datasAulas;
    }

    public String getCadastroEscola(){
        return cadastroEscola;
    }

    public void setCadastroEscola(String cadastroEscola){
        this.cadastroEscola = cadastroEscola;
    }
}
