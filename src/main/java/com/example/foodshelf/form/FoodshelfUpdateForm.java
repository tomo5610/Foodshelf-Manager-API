package com.example.foodshelf.form;

import com.example.foodshelf.entity.Foodshelf;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FoodshelfUpdateForm {
    private int id;

    @NotBlank
    private String foodName;

    @NotNull
    private LocalDate expirationDate;

    @NotNull
    private int sendingTimes;


    // @AllArgsConstructorを削除し、このコンストラクタを手動で追加
    public FoodshelfUpdateForm(int id, String foodName, LocalDate expirationDate, int sendingTimes) {
        this.id = id;
        this.foodName = foodName;
        this.expirationDate = expirationDate;
        this.sendingTimes = sendingTimes;
    }

    public Foodshelf convertToFoodshelf(int id) {
        Foodshelf updateFoodshelf = new Foodshelf(foodName, expirationDate, sendingTimes);
        updateFoodshelf.setId(id);
        return updateFoodshelf;
    }
}
