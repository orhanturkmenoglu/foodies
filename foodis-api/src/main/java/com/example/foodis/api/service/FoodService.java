package com.example.foodis.api.service;

import com.example.foodis.api.io.FoodRequest;
import com.example.foodis.api.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    String uploadFile (MultipartFile file);


    FoodResponse addFood(FoodRequest foodRequest, MultipartFile file);

    List<FoodResponse> getAllFoods();

    FoodResponse getFoodById(String id);

    boolean deleteFile(String fileName);

    void deleteFoodById(String id);
}
