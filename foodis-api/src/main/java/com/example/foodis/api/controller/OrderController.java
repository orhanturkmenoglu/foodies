package com.example.foodis.api.controller;

import com.example.foodis.api.io.OrderRequest;
import com.example.foodis.api.io.OrderResponse;
import com.example.foodis.api.service.OrderService;
import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request) throws StripeException {
        return orderService.createOrderWithPayment(request);
    }

    @PostMapping("/verify-payment")
    @ResponseStatus(HttpStatus.OK)
    public void  verifyPayment(@RequestBody Map<String,String> paymentData){
        orderService.verifyPayment(paymentData,"Succeeded");
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getUserOrder(){
        return orderService.getUserOrder();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable("orderId") String orderId){
        orderService.removeOrder(orderId);
    }

    // admin panel
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getOrdersOfAllUsers(){
        return orderService.getOrdersOfAllUsers();
    }


    // admin panel
    @PutMapping("/status/{orderId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateOrderStatus(@PathVariable("orderId") String orderId,
                                  @RequestParam("status") String status){
        orderService.updateOrderStatus(orderId,status);
    }
}
