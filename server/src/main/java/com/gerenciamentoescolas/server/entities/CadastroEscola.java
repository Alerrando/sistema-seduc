package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "cadastro_escola")
public class CadastroEscola {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String diretor;

    public CadastroEscola(){
    }

    public CadastroEscola(Integer id, String name, String diretor) {
        this.id = id;
        this.name = name;
        this.diretor = diretor;
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

    public String getDiretor() {
        return diretor;
    }

    public void setDiretor(String diretor) {
        this.diretor = diretor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CadastroEscola that = (CadastroEscola) o;
        return Objects.equals(id, that.id) && Objects.equals(diretor, that.diretor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, diretor);
    }
}
