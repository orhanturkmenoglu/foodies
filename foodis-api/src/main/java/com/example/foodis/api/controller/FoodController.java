package com.example.foodis.api.controller;

import com.example.foodis.api.io.FoodRequest;
import com.example.foodis.api.io.FoodResponse;
import com.example.foodis.api.service.FoodService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {


    private final FoodService foodService;

    /*
    @RequestPart Dosya ile birlikte JSON göndermek istiyorsan @RequestPart kullanmalısın.
     */
    @PostMapping
    public FoodResponse addFood(@RequestPart("food") String foodRequest,
                                @RequestPart("file") MultipartFile file){

        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest foodRequestObject = null;

        try {
            foodRequestObject = objectMapper.readValue(foodRequest, FoodRequest.class);
        }catch (JsonProcessingException exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }


        FoodResponse foodResponse = foodService.addFood(foodRequestObject, file);
        return foodResponse;
    }

    @GetMapping
    public List<FoodResponse> getAllFoods(){
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse getFoodById(@PathVariable("id") String id){
        return foodService.getFoodById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFoodById(@PathVariable("id") String id){
        foodService.deleteFoodById(id);
    }

}
