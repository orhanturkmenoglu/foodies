package com.example.foodis.api.service;

import com.example.foodis.api.io.OrderRequest;
import com.example.foodis.api.io.OrderResponse;
import com.stripe.exception.StripeException;

import java.util.List;
import java.util.Map;

public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws StripeException;

    void verifyPayment(Map<String,String> paymentData,String status);

    List<OrderResponse> getUserOrder();

     void removeOrder(String orderId);

     List<OrderResponse> getOrdersOfAllUsers();

     void updateOrderStatus(String orderId,String status);
}
