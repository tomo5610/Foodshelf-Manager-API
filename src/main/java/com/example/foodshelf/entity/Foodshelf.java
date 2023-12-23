package com.example.foodshelf.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class Foodshelf {
    private int id;
    private String foodName;
    private LocalDate expirationDate;
    private int sendingTimes;

    public Foodshelf() {
    }

    public Foodshelf(int id, String foodName, LocalDate expirationDate, int sendingTimes) {
        this.id = id;
        this.foodName = foodName;
        this.expirationDate = expirationDate;
        this.sendingTimes = sendingTimes;
    }

    public Foodshelf(String foodName, LocalDate expirationDate, int sendingTimes) {
        this.foodName = foodName;
        this.expirationDate = expirationDate;
        this.sendingTimes = sendingTimes;
    }
}
