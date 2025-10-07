package com.example.foodis.api.controller;

import com.example.foodis.api.io.UserRequest;
import com.example.foodis.api.io.UserResponse;
import com.example.foodis.api.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register (@RequestBody UserRequest userRequest) {
        UserResponse response = userService.registerUser(userRequest);
        return response;
    }
}
