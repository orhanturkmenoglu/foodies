package com.example.foodis.api.service;

import com.example.foodis.api.io.UserRequest;
import com.example.foodis.api.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest userRequest);

    String findByUserId();
}
