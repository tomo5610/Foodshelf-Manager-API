package com.example.foodshelf.mapper;

import com.example.foodshelf.entity.Foodshelf;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.spring.api.DBRider;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DBRider
@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FoodshelfMapperTest {

    @Autowired
    FoodshelfMapper foodshelfMapper;


    @Test
    @DataSet(value = "datasets/empty.yml")
    @Transactional
    void DBが空の時に空のリストが返されること() {
        assertThat(foodshelfMapper.findByConditions(null, null, null).isEmpty());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @Transactional
    void 全てのIDを取得できること() {
        List<Foodshelf> foodshelves = foodshelfMapper.findByConditions(null, null, null);
        assertThat(foodshelves)
                .hasSize(3)
                .contains(
                        new Foodshelf(1, "鶏肉", LocalDate.of(2023, 12, 1), 3),
                        new Foodshelf(2, "牛肉", LocalDate.of(2023, 12, 11), 2),
                        new Foodshelf(3, "卵", LocalDate.of(2023, 12, 21), 1)
                );
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @ExpectedDataSet(value = "datasets/insert_foodshelf.yml", ignoreCols = "id")
    @Transactional
    void データ登録ができ既存のIDより大きい数字のIDが採番されること() {
        Foodshelf foodshelf = new Foodshelf("玉ねぎ", LocalDate.of(2023, 1, 1), 2);
        foodshelfMapper.createFoodshelf(foodshelf);
        assertThat(foodshelf.getId()).isGreaterThan(3);
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @ExpectedDataSet(value = "datasets/update_foodshelf.yml")
    @Transactional
    void 指定したIDのデータを入力データで更新すること() {
        Foodshelf updatedFoodshelf = new Foodshelf(3, "卵", LocalDate.of(2023, 12, 25), 2);
        foodshelfMapper.updateFoodshelf(updatedFoodshelf);
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @ExpectedDataSet(value = "datasets/delete_foodshelf.yml")
    @Transactional
    void 指定したIDのメンバーが削除できること() {
        foodshelfMapper.deleteFoodshelf(3);
    }
}
