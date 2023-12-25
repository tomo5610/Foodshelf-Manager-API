package com.example.foodshelf.service;

import com.example.foodshelf.entity.Foodshelf;
import com.example.foodshelf.exception.ResourceNotFoundException;
import com.example.foodshelf.mapper.FoodshelfMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class FoodshelfServiceImplTest {

    @InjectMocks
    FoodshelfServiceImpl foodshelfService;

    @Mock
    FoodshelfMapper foodshelfMapper;

    @Test
    public void 存在するIDに紐づく食品棚が1件取得できること() throws Exception {
        doReturn(Optional.of(new Foodshelf(1, "鶏肉", LocalDate.of(2023, 12, 1), 3)))
                .when(foodshelfMapper).findById(1);

        Foodshelf actual = foodshelfService.findById(1);
        assertThat(actual).isEqualTo(new Foodshelf(1, "鶏肉", LocalDate.of(2023, 12, 1), 3));
        verify(foodshelfMapper, times(1)).findById(1);
    }

    @Test
    public void 存在しない食品棚のIDを指定したときに例外が返されること() throws Exception {
        doReturn(Optional.empty()).when(foodshelfMapper).findById(99);

        assertThatThrownBy(
                () -> foodshelfService.findById(99)
        ).isInstanceOfSatisfying(
                ResourceNotFoundException.class, e -> assertThat(e.getMessage()).isEqualTo("Resource not found with id: 99")
        );
    }

    @Test
    public void 条件に該当する食品棚の情報を全て返すこと() throws Exception {
        doReturn(List.of(new Foodshelf(1, "鶏肉", LocalDate.of(2023, 12, 1), 3),
                new Foodshelf(2, "牛肉", LocalDate.of(2023, 12, 11), 2)))
                .when(foodshelfMapper).findByConditions("鶏肉", LocalDate.of(2023, 12, 14), 3);

        List<Foodshelf> actual = foodshelfService.findByConditions("鶏肉", LocalDate.of(2023, 12, 14), 3);
        assertThat(actual).isEqualTo(List.of(new Foodshelf(1, "鶏肉", LocalDate.of(2023, 12, 1), 3),
                new Foodshelf(2, "牛肉", LocalDate.of(2023, 12, 11), 2)));
    }

    @Test
    public void 食品棚が１件登録されること() throws Exception {
        LocalDate expirationDate = LocalDate.of(2023, 12, 1);
        Foodshelf foodshelf = new Foodshelf("鶏肉", expirationDate, 3);
        doNothing().when(foodshelfMapper).createFoodshelf(foodshelf);

        foodshelfService.createFoodshelf("鶏肉", expirationDate, 3);
        verify(foodshelfMapper, times(1)).createFoodshelf(foodshelf);
    }

    @Test
    public void 存在する食品棚のIDを指定したときに食品棚を更新できること() throws Exception {
        Foodshelf updateFoodshelf = new Foodshelf(1, "鶏肉", LocalDate.of(2023, 12, 1), 3);
        foodshelfService.updateFoodshelf(updateFoodshelf);
        verify(foodshelfMapper, times(1)).updateFoodshelf(updateFoodshelf);
    }

    @Test
    public void 存在する食品棚のIDを指定したときに食品棚を削除できること() throws Exception {
        foodshelfService.deleteFoodshelf(1);
        verify(foodshelfMapper, times(1)).deleteFoodshelf(1);
    }
}
