package com.gerenciamentoescolas.server.dto;

public class CadastroEscolaDTO {
    private Integer id;
    private String name;
    private Integer quantidadeAulas;

    public CadastroEscolaDTO(){
    }

    public CadastroEscolaDTO(Integer id, String name, Integer quantidadeAulas){
        this.id = id;
        this.name = name;
        this.quantidadeAulas = quantidadeAulas;
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

}
