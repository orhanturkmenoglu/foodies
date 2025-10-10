package com.example.foodis.api.service;

import com.example.foodis.api.entity.OrderEntity;
import com.example.foodis.api.io.OrderRequest;
import com.example.foodis.api.io.OrderResponse;
import com.example.foodis.api.repository.CartRepository;
import com.example.foodis.api.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final CartRepository cartRepository;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws StripeException {
        OrderEntity newOrder = convertToEntity(request);
        newOrder= orderRepository.save(newOrder);

        // create razorpay payment order
        long amountInCents = (long) (newOrder.getAmount() * 100);
        PaymentIntentCreateParams  params =PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency("try")
                .setCaptureMethod(PaymentIntentCreateParams.CaptureMethod.AUTOMATIC)
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        newOrder.setPaymentIntentId(paymentIntent.getId());
        newOrder.setClientSecret(paymentIntent.getClientSecret());
        newOrder.setPaymentStatus(paymentIntent.getStatus());
        newOrder.setOrderStatus("Preparing");
        String loggedInUserId = userService.findByUserId();
        newOrder.setUserId(loggedInUserId);
        newOrder = orderRepository.save(newOrder);

        return convertToResponse(newOrder);
    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String paymentIntentId = paymentData.get("payment_intent_id");
        OrderEntity existingOrder = orderRepository.findByPaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Payment intent not found"));

        existingOrder.setPaymentStatus(status);
        existingOrder.setClientSecret(paymentData.get("client_secret"));
        existingOrder.setPaymentMethodId(paymentData.get("payment_method_id"));
        existingOrder.setPaymentIntentId(paymentData.get("payment_intent_id"));
        orderRepository.save(existingOrder);

        if ("Succeeded".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserId(existingOrder.getUserId());
        }
        else {
            existingOrder.setOrderStatus("Cancelled");
            orderRepository.save(existingOrder);
        }


    }

    @Override
    public List<OrderResponse> getUserOrder() {
        String loggedInUserId = userService.findByUserId();
        List<OrderEntity> list = orderRepository.findByUserId(loggedInUserId);
        return list.stream().map(this::convertToResponse).toList();
    }

    @Override
    public void removeOrder(String orderId) {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrdersOfAllUsers() {
        List<OrderEntity> list = orderRepository.findAll();
       return list.stream().map(this::convertToResponse).toList();
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
        OrderEntity orderEntity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderEntity.setOrderStatus(status);
        orderRepository.save(orderEntity);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
            return OrderResponse.builder()
                    .id(newOrder.getId())
                    .userId(newOrder.getUserId())
                    .userAddress(newOrder.getUserAddress())
                    .amount(newOrder.getAmount())
                    .paymentIntentId(newOrder.getPaymentIntentId())
                    .clientSecret(newOrder.getClientSecret())
                    .paymentStatus(newOrder.getPaymentStatus())
                    .orderStatus(newOrder.getOrderStatus())
                    .email(newOrder.getEmail())
                    .phoneNumber(newOrder.getPhoneNumber())
                    .orderedItems(newOrder.getOrderedItems())
                    .build();
    }

    private OrderEntity convertToEntity(OrderRequest request) {
        return OrderEntity.builder()
                .userAddress(request.getUserAddress())
                .amount(request.getAmount())
                .orderedItems(request.getOrderedItems())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .orderStatus(request.getOrderStatus())
                .build();
    }
}
