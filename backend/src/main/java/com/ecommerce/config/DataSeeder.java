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
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedProducts();
    }

    private void seedAdminUser() {
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
    }

    private void seedProducts() {
        List<Product> products = Arrays.asList(
            new Product(null, "Smartphone X", "Latest smartphone with high-res camera and fast processor", 
                new BigDecimal("699.99"), "Electronics", 
                "https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&q=80&w=800", 
                50),
            
            new Product(null, "Laptop Pro", "Powerful laptop for professionals and creatives", 
                new BigDecimal("1299.99"), "Electronics", 
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800", 
                30),
            
            new Product(null, "Wireless Headphones", "Noise-cancelling wireless headphones with long battery life", 
                new BigDecimal("199.99"), "Electronics", 
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800", 
                100),
            
            new Product(null, "Smart Watch", "Fitness tracker and smartwatch with heart rate monitor", 
                new BigDecimal("149.99"), "Electronics", 
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800", 
                75),
            
            new Product(null, "Running Shoes", "Comfortable and durable running shoes for all terrains", 
                new BigDecimal("89.99"), "Sports", 
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", 
                60),
            
            new Product(null, "Yoga Mat", "Non-slip yoga mat with carrying strap", 
                new BigDecimal("29.99"), "Sports", 
                "https://images.unsplash.com/photo-1518616811451-cb782411b5c3?auto=format&fit=crop&q=80&w=800", 
                120),
            
            new Product(null, "Coffee Maker", "Programmable coffee maker with thermal carafe", 
                new BigDecimal("79.99"), "Home", 
                "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800", 
                40),
            
            new Product(null, "Leather Backpack", "Stylish and durable leather backpack for travel or work", 
                new BigDecimal("119.99"), "Fashion", 
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800", 
                25),
             
            new Product(null, "Gaming Console", "Next-gen gaming console with 4K support", 
                new BigDecimal("499.99"), "Electronics", 
                "https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&q=80&w=800", 
                15),

            new Product(null, "Designer Sunglasses", "Classic aviator sunglasses with UV protection", 
                new BigDecimal("159.99"), "Fashion", 
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", 
                50),

            // New Products
            new Product(null, "4K Smart TV", "55-inch 4K Ultra HD Smart LED TV with HDR", 
                new BigDecimal("499.99"), "Electronics", 
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800", 
                20),

            new Product(null, "Bluetooth Speaker", "Portable waterproof bluetooth speaker with 20h battery", 
                new BigDecimal("59.99"), "Electronics", 
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800", 
                100),

            new Product(null, "Denim Jacket", "Classic blue denim jacket for casual wear", 
                new BigDecimal("79.99"), "Fashion", 
                "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800", 
                45),

            new Product(null, "Summer Dress", "Floral print summer dress, lightweight and breathable", 
                new BigDecimal("49.99"), "Fashion", 
                "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800", 
                60),

            new Product(null, "Office Chair", "Ergonomic mesh office chair with lumbar support", 
                new BigDecimal("199.99"), "Home", 
                "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800", 
                15),

            new Product(null, "Desk Lamp", "LED desk lamp with adjustable brightness and color temp", 
                new BigDecimal("34.99"), "Home", 
                "https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&q=80&w=800", 
                80),

            new Product(null, "Dumbbell Set", "Adjustable dumbbell set for home workouts", 
                new BigDecimal("149.99"), "Sports", 
                "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800", 
                25),

            new Product(null, "Tennis Racket", "Professional lightweight tennis racket", 
                new BigDecimal("129.99"), "Sports", 
                "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800", 
                30),

            new Product(null, "Face Serum", "Vitamin C serum for brightening and anti-aging", 
                new BigDecimal("45.00"), "Beauty", 
                "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800", 
                100),

            new Product(null, "Moisturizer", "Hydrating face moisturizer for all skin types", 
                new BigDecimal("28.00"), "Beauty", 
                "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=800", 
                150),

            new Product(null, "Sci-Fi Novel", "Bestselling science fiction novel", 
                new BigDecimal("15.99"), "Books", 
                "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800", 
                200),

            new Product(null, "Cookbook", "Healthy recipes for everyday cooking", 
                new BigDecimal("24.99"), "Books", 
                "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800", 
                75)
        );

        for (Product product : products) {
            if (productRepository.findByNameContainingIgnoreCase(product.getName()).isEmpty()) {
                productRepository.save(product);
            }
        }
        System.out.println("Seeded products check complete.");
    }
}
