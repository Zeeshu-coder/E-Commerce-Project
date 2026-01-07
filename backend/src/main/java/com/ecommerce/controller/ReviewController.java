package com.ecommerce.controller;

import com.ecommerce.model.Review;
import com.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public List<Review> getProductReviews(@PathVariable Long productId) {
        return reviewService.getReviewsByProduct(productId);
    }

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Map<String, Object> payload) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Long productId = Long.valueOf(payload.get("productId").toString());
        Integer rating = Integer.valueOf(payload.get("rating").toString());
        String comment = (String) payload.get("comment");

        return ResponseEntity.ok(reviewService.addReview(email, productId, rating, comment));
    }
}
