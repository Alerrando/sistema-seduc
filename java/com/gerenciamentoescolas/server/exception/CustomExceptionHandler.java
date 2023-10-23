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
    @ExceptionHandler(LessonAlreadyRegistered.class)
    public ResponseEntity<Object> handleAulasJaCadastradaException(
            LessonAlreadyRegistered excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(SchoolAlreadyRegistered.class)
    public ResponseEntity<Object> handleEscolaJaCadastradaException(
            SchoolAlreadyRegistered excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }



    @ExceptionHandler(TeacherAlreadyRegistered.class)
    public ResponseEntity<Object> handleProfessorJaCadastradoException(
            TeacherAlreadyRegistered excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(UserJaCadastradoException.class)
    public ResponseEntity<Object> handleUserJaCadastradoException(
            UserJaCadastradoException excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(DefinitionPeriodsException.class)
    public ResponseEntity<Object> handleDefinitionPeriodsException(
            DefinitionPeriodsException excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST,request);
    }

    @ExceptionHandler(RegisterOfficeException.class)
    public ResponseEntity<Object> handleRegisterOfficeException(
            RegisterOfficeException excessão, WebRequest request){
        String message = excessão.getMessage();
        return handleExceptionInternal(excessão, message, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
