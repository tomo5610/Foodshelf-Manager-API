package com.example.foodshelf.mapper;

import com.example.foodshelf.entity.Foodshelf;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MailMapper {
    @Select("SELECT id, food_name AS foodName, expiration_date AS expirationDate, sending_times AS sendingTimes FROM foodshelf " +
            "WHERE expiration_date IS NOT NULL AND sending_times IS NOT NULL")
    List<Foodshelf> findFoodshelvesWithExpirationDate();
}
