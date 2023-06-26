package com.gerenciamentoescolas.server.security;

import com.gerenciamentoescolas.server.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;

public class JWTTokenProvider {
    private static final SecretKey CHAVE = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    static public String createToken(User usuario){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 86400000);

        String jwtToken = Jwts.builder()
                .setSubject("usuario")
                .setIssuer("localhost:8080")
                .claim("level", usuario.getLevel())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(CHAVE)
                .compact();
        return jwtToken;
    }

    static public boolean verifyToken(String token){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(CHAVE)
                    .build()
                    .parseClaimsJws(token)
                    .getSignature();

            return true;
        } catch (Exception e){
            return false;
        }
    }

    static public Claims getAllClaimsFromToken(String token){
        Claims claims = null;
        try{
            claims = Jwts.parserBuilder()
                    .setSigningKey(CHAVE)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims;
        } catch (Exception e){
            return claims;
        }
    }
}
