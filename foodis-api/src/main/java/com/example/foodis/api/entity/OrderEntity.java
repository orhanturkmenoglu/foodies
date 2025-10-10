package com.example.foodis.api.entity;

import com.example.foodis.api.io.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
@Builder
public class OrderEntity {

    @Id
    private String id;
    private String userId;
    private String userAddress;
    private String phoneNumber;
    private String email;
    private List<OrderItem> orderedItems;
    private double amount;
    // Stripe-specific fields
    private String paymentIntentId;   // Stripe PaymentIntent ID
    private String paymentMethodId;   // Stripe PaymentMethod ID
    private String clientSecret;      // For client-side confirmation
    private String chargeId;          // Created after successful payment

    private String paymentStatus;     // e.g., "PENDING", "SUCCEEDED", "FAILED"
    private String orderStatus;       // e.g., "CREATED", "CONFIRMED", "DELIVERED", etc.
}
