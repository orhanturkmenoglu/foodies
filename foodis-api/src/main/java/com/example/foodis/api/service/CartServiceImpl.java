package com.example.foodis.api.service;

import com.example.foodis.api.entity.CartEntity;
import com.example.foodis.api.io.CartRequest;
import com.example.foodis.api.io.CartResponse;
import com.example.foodis.api.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
        String loggedInUserId = userService.findByUserId();
        Optional<CartEntity> cartOptional = cartRepository.findByUserId(loggedInUserId);
        CartEntity cartEntity = cartOptional.orElseGet(() -> new CartEntity(loggedInUserId, new HashMap<>()));

        Map<String, Integer> items = cartEntity.getItems();
        items.put(request.getFoodId(), items.getOrDefault(request.getFoodId(), 0) + 1);
        cartEntity.setItems(items);
        cartEntity = cartRepository.save(cartEntity);
        return  convertToResponse(cartEntity);
    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId = userService.findByUserId();
        CartEntity cartEntity = cartRepository.findByUserId(loggedInUserId)
                .orElse(new CartEntity(null, loggedInUserId, new HashMap<>()));

        return convertToResponse(cartEntity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId = userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest request) {
        String loggedInUserId = userService.findByUserId();
        CartEntity cartEntity = cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(() -> new RuntimeException("Cart is not found"));

        Map<String, Integer> cartItems = cartEntity.getItems();
        
        if (cartItems.containsKey(request.getFoodId())){
            int currentQty = cartItems.get(request.getFoodId());
            if (currentQty > 0) {
                cartItems.put(request.getFoodId(),currentQty-1);
            }else {
                cartItems.remove(request.getFoodId());
            }
            cartEntity = cartRepository.save(cartEntity);
        }
            return  convertToResponse(cartEntity);
    }


    private CartResponse convertToResponse(CartEntity entity) {
        return CartResponse.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .items(entity.getItems())
                .build();
    }
}
