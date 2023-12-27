package com.example.foodshelf.service;

import com.example.foodshelf.entity.Foodshelf;
import com.example.foodshelf.exception.ResourceNotFoundException;
import com.example.foodshelf.mapper.FoodshelfMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FoodshelfServiceImpl implements FoodshelfService {
    private final FoodshelfMapper foodshelfMapper;

    public FoodshelfServiceImpl(FoodshelfMapper foodshelfMapper) {
        this.foodshelfMapper = foodshelfMapper;
    }

    @Override
    public Foodshelf findById(int id) {
        Optional<Foodshelf> foodshelf = this.foodshelfMapper.findById(id);
        return foodshelf.orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
    }

    @Override
    public List<Foodshelf> findByConditions(String foodName, LocalDate expirationDate, Integer sendingTimes) {
        return foodshelfMapper.findByConditions(foodName, expirationDate, sendingTimes);
    }

    @Override
    public Foodshelf createFoodshelf(String foodName, LocalDate expirationDate, int sendingTimes) {
        Foodshelf foodshelf = new Foodshelf(foodName, expirationDate, sendingTimes);
        foodshelfMapper.createFoodshelf(foodshelf);
        return foodshelf;
    }

    @Override
    public void updateFoodshelf(int id, Foodshelf foodshelf) {
        // 指定したIDに対応するFoodshelfが存在するか確認
        Foodshelf existingFoodshelf = foodshelfMapper.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));

        // 更新対象のフィールドを設定
        existingFoodshelf.setFoodName(foodshelf.getFoodName());
        existingFoodshelf.setExpirationDate(foodshelf.getExpirationDate());
        existingFoodshelf.setSendingTimes(foodshelf.getSendingTimes());

        // 更新処理を実行
        foodshelfMapper.updateFoodshelf(existingFoodshelf);
    }

    @Override
    public void deleteFoodshelf(int id) {
        Foodshelf deleteFoodshelf = foodshelfMapper.findById(id).orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
        foodshelfMapper.deleteFoodshelf(id);
    }
}
