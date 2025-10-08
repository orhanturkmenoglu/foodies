package com.example.foodis.api.service;

import com.example.foodis.api.io.CartRequest;
import com.example.foodis.api.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();
}
