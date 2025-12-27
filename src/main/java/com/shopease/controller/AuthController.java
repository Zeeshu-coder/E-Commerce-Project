package com.shopease.controller;

import com.shopease.dto.LoginRequest;
import com.shopease.dto.RegisterRequest;
import com.shopease.entity.User;
import com.shopease.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );
    }
}