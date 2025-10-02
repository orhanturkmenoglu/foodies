package com.example.foodis.api.service;

import com.example.foodis.api.entity.FoodEntity;
import com.example.foodis.api.io.FoodRequest;
import com.example.foodis.api.io.FoodResponse;
import com.example.foodis.api.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final S3Client s3Client;

    private final FoodRepository foodRepository;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) {
        String fileNameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String key = UUID.randomUUID().toString().concat(".").concat(fileNameExtension);

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if (response.sdkHttpResponse().isSuccessful()) {
                return "https://" + bucketName + ".s3.amazonaws.com/" + key;
            } else {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
            }


        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An exception occurred while uploading the file");
        }

    }

    @Override
    public FoodResponse addFood(FoodRequest foodRequest, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(foodRequest);
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);


        FoodEntity savedFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(savedFoodEntity);
    }

    @Override
    public List<FoodResponse> getAllFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();

        return databaseEntries.stream()
                .map(object -> convertToResponse(object))
                .toList();
    }

    @Override
    public FoodResponse getFoodById(String id) {
        FoodEntity existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Food not found"));

        return  convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String fileName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteFoodById(String id) {
        FoodResponse foodResponse = getFoodById(id);
        String imageUrl = foodResponse.getImageUrl();
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        System.out.println(fileName);
        boolean isFileDelete = deleteFile(fileName);

        if(isFileDelete){
            foodRepository.deleteById(foodResponse.getId());
        }
    }



    private FoodEntity convertToEntity(FoodRequest foodRequest) {
        return FoodEntity.builder()
                .name(foodRequest.getName())
                .description(foodRequest.getDescription())
                .category(foodRequest.getCategory())
                .price(foodRequest.getPrice())
                .build();
    }


    private FoodResponse convertToResponse(FoodEntity foodEntity) {
        return FoodResponse.builder()
                .id(foodEntity.getId())
                .name(foodEntity.getName())
                .description(foodEntity.getDescription())
                .category(foodEntity.getCategory())
                .price(foodEntity.getPrice())
                .imageUrl(foodEntity.getImageUrl())
                .build();
    }
}
