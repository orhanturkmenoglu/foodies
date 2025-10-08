package com.example.foodis.api.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse {
    private String id;
    private String userId;
    private Map<String,Integer> items = new HashMap<>();
}
