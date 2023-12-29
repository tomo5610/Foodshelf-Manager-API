package com.example.foodshelf.mapper;

import com.example.foodshelf.entity.Foodshelf;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Mapper
public interface FoodshelfMapper {

    @Select("SELECT id, food_name AS foodName, expiration_date AS expirationDate, sending_times AS sendingTimes FROM foodshelf WHERE id = #{id}")
    Optional<Foodshelf> findById(int id);

    @Select("<script>"
            + " SELECT"
            + " id, food_name AS foodName, expiration_date AS expirationDate, sending_times AS sendingTimes"
            + " FROM foodshelf"
            + "<where>"
            + "<if test=' foodName != null and foodName != \"\"'>"
            + "  AND food_name LIKE '%${foodName}%'"
            + "</if>"
            + "<if test=' expirationDate != null '>"
            + "  AND expiration_date <![CDATA[<]]>= '${expirationDate}'"
            + "</if>"
            + "<if test=' sendingTimes != null '>"
            + "  AND sending_times = ${sendingTimes}"
            + "</if>"
            + "</where>"
            + " ORDER BY expirationDate"
            + "</script>")
    List<Foodshelf> findByConditions(String foodName, LocalDate expirationDate, Integer sendingTimes);

    @Insert("INSERT INTO foodshelf (food_name, expiration_date, sending_times) VALUES (#{foodName},#{expirationDate},#{sendingTimes})")
    @Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id")
    void createFoodshelf(Foodshelf foodshelf);

    @Update("UPDATE foodshelf SET food_name = #{foodName} , expiration_date = #{expirationDate} , sending_times = #{sendingTimes} WHERE id = #{id}")
    void updateFoodshelf(Foodshelf foodshelf);

    @Delete("DELETE FROM foodshelf where id = #{id}")
    void deleteFoodshelf(int id);
}
