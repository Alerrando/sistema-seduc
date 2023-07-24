package com.gerenciamentoescolas.server.dto;

import java.util.ArrayList;

public class CadastroEscolaDTO {
    private Integer id;
    private String name;
    private ArrayList<Object[]> datesWork;
    private Integer quantidadeAulas;
    private String cargo;

    public CadastroEscolaDTO(){
    }

    public CadastroEscolaDTO(Integer id, String name, ArrayList<Object[]> datesWork,Integer quantidadeAulas, String cargo){
        this.id = id;
        this.name = name;
        this.datesWork = datesWork;
        this.quantidadeAulas = quantidadeAulas;
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

    public Integer getQuantidadeAulas() {
        return quantidadeAulas;
    }

    public void setQuantidadeAulas(Integer quantidadeAulas) {
        this.quantidadeAulas = quantidadeAulas;
    }

    public ArrayList<Object[]> getDatesWork(){
        return datesWork;
    }

    public void setDatesWork(ArrayList<Object[]> datesWork){
        this.datesWork = datesWork;
    }

    public String getCargo(){
        return cargo;
    }

    public void setCargo(String cargo){
        this.cargo = cargo;
    }
}
