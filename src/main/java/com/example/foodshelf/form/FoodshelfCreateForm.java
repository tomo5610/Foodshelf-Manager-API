package com.example.foodshelf.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FoodshelfCreateForm {
    private int id;

    @NotBlank
    private String foodName;

    @NotNull
    private LocalDate expirationDate;

    @NotNull
    private int sendingTimes;


    // @AllArgsConstructorを削除し、このコンストラクタを手動で追加
    public FoodshelfCreateForm(int id, String foodName, LocalDate expirationDate, int sendingTimes) {
        this.id = id;
        this.foodName = foodName;
        this.expirationDate = expirationDate;
        this.sendingTimes = sendingTimes;
    }
}
