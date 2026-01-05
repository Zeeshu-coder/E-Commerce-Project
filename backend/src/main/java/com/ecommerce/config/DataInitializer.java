package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create Admin User if not exists
        if (userRepository.findByEmail("admin@ecommerce.com").isEmpty()) {
            User admin = new User();
            admin.setFullName("Admin User");
            admin.setEmail("admin@ecommerce.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhoneNumber("1234567890");
            admin.setRole(User.Role.ADMIN);
            admin.setAddress("Admin HQ");
            userRepository.save(admin);
            System.out.println("Default admin created: admin@ecommerce.com / admin123");
        }

        // Create Sample Products if none exist
        if (productRepository.count() == 0) {
            createProduct("Smartphone X", "Latest smartphone with high-res camera", new BigDecimal("999.99"), "Electronics", 50, "https://images.unsplash.com/photo-1598327771808-86f31d978130?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60");
            createProduct("Laptop Pro", "Powerful laptop for professionals", new BigDecimal("1499.99"), "Electronics", 30, "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60");
            createProduct("Wireless Headphones", "Noise-cancelling wireless headphones", new BigDecimal("199.99"), "Audio", 100, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60");
            createProduct("Running Shoes", "Comfortable running shoes", new BigDecimal("89.99"), "Fashion", 60, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60");
            createProduct("Classic Watch", "Elegant analog watch", new BigDecimal("250.00"), "Accessories", 40, "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60");
            System.out.println("Sample products created");
        }
    }

    private void createProduct(String name, String description, BigDecimal price, String category, int stock, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);
        product.setStockQuantity(stock);
        product.setImageUrl(imageUrl);
        productRepository.save(product);
    }
}
