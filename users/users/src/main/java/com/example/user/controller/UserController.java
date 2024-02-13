package com.example.user.controller;

import com.example.user.model.AuthResponse;
import com.example.user.model.User;
import com.example.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

@RestController
@CrossOrigin
@RequestMapping(value = "/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<?> getAll()
    {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id)
    {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
    //Authorization
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            // Generate token
            String token = generateToken(user);

            return ResponseEntity.ok(new AuthResponse(token, user.getRole(), user.getId()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    /*
    It generates a JWT token upon successful login. It uses the Jwts.builder() to set the subject, issue date, expiration date, and signing key.
     */
    private String generateToken(User user) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Set the JWT token here
        long expMillis = nowMillis + 3600000; // 1 hour for token to be valid
        Date exp = new Date(expMillis);


        String secretKey = "qwerty";

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

/////////////////////////////////////////////////////////////////////////////////
    @PostMapping()
    public ResponseEntity<?> insert(@RequestBody User user)
    {
        return new ResponseEntity<>(userService.insert(user), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody User user)
    {
        return new ResponseEntity<>(userService.update(id, user), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id)
    {
        userService.delete(id);
        return new ResponseEntity<>("Deleted user with id " + id, HttpStatus.OK);
    }


}