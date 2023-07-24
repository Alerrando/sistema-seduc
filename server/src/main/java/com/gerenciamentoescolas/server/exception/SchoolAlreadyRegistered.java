package com.gerenciamentoescolas.server.exception;

public class SchoolAlreadyRegistered extends RuntimeException{
    public SchoolAlreadyRegistered(String message){
        super(message);
    }
}
