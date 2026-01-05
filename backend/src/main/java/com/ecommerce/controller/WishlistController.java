package com.ecommerce.controller;

import com.ecommerce.model.Product;
import com.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public List<Product> getWishlist() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return wishlistService.getWishlistProducts(email);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<Void> addToWishlist(@PathVariable Long productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        wishlistService.addToWishlist(email, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromWishlist(@PathVariable Long productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        wishlistService.removeFromWishlist(email, productId);
        return ResponseEntity.ok().build();
    }
}
