package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer name;
    private Integer rg;
    private Integer cadastroEscola;
    private Integer level;
    private boolean permission;

    public User(){
    }

    public User(Integer id, Integer name, Integer rg, Integer cadastroEscola, Integer level, boolean permission) {
        this.id = id;
        this.name = name;
        this.rg = rg;
        this.cadastroEscola = cadastroEscola;
        this.level = level;
        this.permission = permission;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getName() {
        return name;
    }

    public void setName(Integer name) {
        this.name = name;
    }

    public Integer getRg() {
        return rg;
    }

    public void setRg(Integer rg) {
        this.rg = rg;
    }

    public Integer getCadastroEscola() {
        return cadastroEscola;
    }

    public void setCadastroEscola(Integer cadastroEscola) {
        this.cadastroEscola = cadastroEscola;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public boolean isPermission() {
        return permission;
    }

    public void setPermission(boolean permission) {
        this.permission = permission;
    }
}
