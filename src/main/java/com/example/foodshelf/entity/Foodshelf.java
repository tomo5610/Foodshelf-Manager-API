package com.example.foodshelf.entity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Foodshelf foodshelf = (Foodshelf) o;
        return id == foodshelf.id &&
                sendingTimes == foodshelf.sendingTimes &&
                Objects.equals(foodName, foodshelf.foodName) &&
                Objects.equals(expirationDate, foodshelf.expirationDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, foodName, expirationDate, sendingTimes);
    }

}
