package com.example.foodis.api.repository;

import com.example.foodis.api.entity.OrderEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity, String> {

    List<OrderEntity> findByUserId(String userId);

    Optional<OrderEntity> findByPaymentIntentId(String paymentIntentId);
}
