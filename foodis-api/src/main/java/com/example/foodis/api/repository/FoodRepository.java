package com.example.foodis.api.repository;

import com.example.foodis.api.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository  extends MongoRepository<FoodEntity,String> {
}
