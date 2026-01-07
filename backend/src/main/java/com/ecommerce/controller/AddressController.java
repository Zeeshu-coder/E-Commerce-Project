package com.ecommerce.controller;

import com.ecommerce.model.Address;
import com.ecommerce.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public List<Address> getUserAddresses() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return addressService.getUserAddresses(email);
    }

    @PostMapping
    public Address addAddress(@RequestBody Address address) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return addressService.addAddress(email, address);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        addressService.deleteAddress(email, id);
        return ResponseEntity.ok().build();
    }
}
