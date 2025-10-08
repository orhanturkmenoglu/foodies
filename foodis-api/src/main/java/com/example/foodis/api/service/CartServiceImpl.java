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


    private CartResponse convertToResponse(CartEntity entity) {
        return CartResponse.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .items(entity.getItems())
                .build();
    }
}
