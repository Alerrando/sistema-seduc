package com.gerenciamentoescolas.server.security.filters;

import com.gerenciamentoescolas.server.security.JWTTokenProvider;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;

@CrossOrigin
public class AccessFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization");

        if(req.getMethod().equals("OPTIONS")) {
            chain.doFilter(request, response);
        }
        else{
                if(token != null && JWTTokenProvider.verifyToken(token)){
                    Claims claims = JWTTokenProvider.getAllClaimsFromToken(token);
                    Integer level = (Integer) claims.get("level");
                    request.setAttribute("level", level);
                    chain.doFilter(request, response);
                }
                else{
                    ((HttpServletResponse)response).setStatus(500);
                    response.getOutputStream().write("Não Autorizado".getBytes());
                }

        }
    }
}
