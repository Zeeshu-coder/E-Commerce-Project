package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        seedProducts();
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
                50)
        );

        for (Product product : products) {
            if (productRepository.findByNameContainingIgnoreCase(product.getName()).isEmpty()) {
                productRepository.save(product);
            }
        }
        System.out.println("Seeded products check complete.");
    }
}
