package com.gerenciamentoescolas.server.entities;

public class ErrorResponse {
    private String url;

    public ErrorResponse(){
    }

    public ErrorResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
