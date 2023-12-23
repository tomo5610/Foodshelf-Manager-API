package com.example.foodshelf.controller;

import com.example.foodshelf.entity.Foodshelf;
import com.example.foodshelf.exception.ResourceNotFoundException;
import com.example.foodshelf.form.FoodshelfCreateForm;
import com.example.foodshelf.form.FoodshelfUpdateForm;
import com.example.foodshelf.service.FoodshelfService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class FoodshelfController {
    private final FoodshelfService foodshelfService;

    public FoodshelfController(FoodshelfService foodshelfService) {
        this.foodshelfService = foodshelfService;
    }

    @GetMapping("/foodshelves/{id}")
    public Foodshelf findById(@PathVariable("id") int id) {
        return foodshelfService.findById(id);
    }

    @GetMapping("/foodshelves")
    public List<Foodshelf> findByConditions(@RequestParam(name = "foodName", required = false) String foodName,
                                            @RequestParam(name = "expirationDate", required = false) LocalDate expirationDate,
                                            @RequestParam(name = "sendingTimes", required = false) Integer sendingTimes) {
        return foodshelfService.findByConditions(foodName, expirationDate, sendingTimes);
    }

    @PostMapping("/foodshelves")
    public ResponseEntity<Map<String, String>> create(
            @RequestBody @Validated FoodshelfCreateForm form, UriComponentsBuilder uriBuilder) {
        Foodshelf foodshelf = foodshelfService.createFoodshelf(form.getFoodName(), form.getExpirationDate(), form.getSendingTimes());
        URI url = uriBuilder
                .path("/foodshelves/" + foodshelf.getId())
                .build()
                .toUri();
        return ResponseEntity.created(url).body(Map.of("message", "foodshelf successfully created"));
    }

    @PatchMapping("/foodshelves/{id}")
    public ResponseEntity<Map<String, String>> update(
            @PathVariable("id") int id, @RequestBody @Validated FoodshelfUpdateForm form) {
        foodshelfService.updateFoodshelf(form.convertToFoodshelf(id));
        return ResponseEntity.ok(Map.of("message", "foodshelf successfully updated"));
    }

    @DeleteMapping("/foodshelves/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") int id) {
        foodshelfService.deleteFoodshelf(id);
        return ResponseEntity.ok(Map.of("message", "foodshelf successfully deleted"));
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleNoResourceFound(
            ResourceNotFoundException e, HttpServletRequest request) {
        Map<String, String> body = Map.of(
                "timestamp", ZonedDateTime.now().toString(),
                "status", String.valueOf(HttpStatus.NOT_FOUND.value()),
                "error", HttpStatus.NOT_FOUND.getReasonPhrase(),
                "message", e.getMessage(),
                "path", request.getRequestURI());
        return new ResponseEntity(body, HttpStatus.NOT_FOUND);
    }
}
