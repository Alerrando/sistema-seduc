package com.gerenciamentoescolas.server.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice // responsável por tratar excessões em todos o aplicativo
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(AulasJaCadastradaException.class)
    public ResponseEntity<Object> handleAulasJaCadastradaException(
            AulasJaCadastradaException excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(EscolaJaCadastradaException.class)
    public ResponseEntity<Object> handleEscolaJaCadastradaException(
        EscolaJaCadastradaException excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }



    @ExceptionHandler(ProfessorJaCadastradoException.class)
    public ResponseEntity<Object> handleProfessorJaCadastradoException(
            ProfessorJaCadastradoException excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
