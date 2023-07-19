package com.gerenciamentoescolas.server.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String rg;
    private String password;
    private String office;
    private Integer cadastroEscola;
    private Integer level;
    private Integer permission;
    private Integer mandatoryBulletin;

    public User(){
    }

    public User(Integer id, String name, String email, String rg, String password, String office,Integer cadastroEscola, Integer level, Integer permission, Integer mandatoryBulletin) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rg = rg;
        this.password = password;
        this.office = office;
        this.cadastroEscola = cadastroEscola;
        this.level = level;
        this.permission = permission;
        this.mandatoryBulletin = mandatoryBulletin;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOffice(){
        return office;
    }

    public void setOffice(String office) { 
        this.office = office;
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

    public Integer getPermission() {
        return permission;
    }

    public void setPermission(Integer permission) {
        this.permission = permission;
    }

    public Integer getMandatoryBulletin() {
        return mandatoryBulletin;
    }

    public void setMandatoryBulletin(Integer mandatoryBulletin) {
        this.mandatoryBulletin = mandatoryBulletin;
    }
}
