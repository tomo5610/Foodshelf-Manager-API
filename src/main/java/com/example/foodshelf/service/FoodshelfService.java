package com.example.foodshelf.service;

import com.example.foodshelf.entity.Foodshelf;

import java.time.LocalDate;
import java.util.List;

public interface FoodshelfService {

    Foodshelf findById(int id);

    List<Foodshelf> findByConditions(String foodName, LocalDate expirationDate, Integer sendingTimes);

    Foodshelf createFoodshelf(String foodName, LocalDate expirationDate, int sendingTimes);

    void updateFoodshelf(int id, Foodshelf updatedFoodshelf);

    void deleteFoodshelf(int id);
}
