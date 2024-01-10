package com.example.foodshelf.integrationtest;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class FoodshelfRestApiIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @Transactional
    void 全ての食材を取得した際にステータスコードが200を返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/foodshelves"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @Transactional
    void 存在する指定したIDの食材を取得した際にステータスコードが200を返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/foodshelves/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @Transactional
    void 存在しないIDを指定して食材を取得するとレスポンスが404を返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/foodshelves/99"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @ExpectedDataSet(value = "datasets/insert_foodshelf.yml", ignoreCols = "id")
    @Transactional
    void 食材を新規登録できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/foodshelves")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "foodName": "玉ねぎ",
                                    "expirationDate": "2023-01-01",
                                    "sendingTimes": 2
                                }
                                """))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(header().string("Location", matchesPattern("http://localhost/foodshelves/\\d+")))
                .andExpect(content().json("""
                        {
                            "message": "設備が正常に登録されました"
                        }
                        """));
    }


    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @ExpectedDataSet(value = "datasets/update_foodshelf.yml")
    @Transactional
    void 指定したIDの食材を更新できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.patch("/foodshelves/3")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                    {
                                        "foodName": "卵",
                                        "expirationDate": "2023-12-25",
                                        "sendingTimes": 2
                                    }
                                """))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @Transactional
    void 存在しないIDの食材を更新した際にエラーメッセージを返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.patch("/foodshelves/99")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                    {
                                        "foodName": "サーモン",
                                        "expirationDate": "2023-01-01",
                                        "sendingTimes": 2
                                    }
                                """))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @ExpectedDataSet(value = "datasets/delete_foodshelf.yml")
    @Transactional
    void 食材を1件削除できること() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/foodshelves/3"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DataSet(value = "datasets/foodshelf.yml")
    @Transactional
    void 存在しないIDを削除した際のレスポンスが404を返すこと() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/foodshelves/99")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
