package com.ecommerce.service;

import com.ecommerce.model.Address;
import com.ecommerce.model.User;
import com.ecommerce.repository.AddressRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<Address> getUserAddresses(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return addressRepository.findByUserId(user.getId());
    }

    @Transactional
    public Address addAddress(String email, Address address) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        address.setUser(user);
        
        if (address.isDefault()) {
            // Unset other default addresses
            List<Address> addresses = addressRepository.findByUserId(user.getId());
            for (Address a : addresses) {
                if (a.isDefault()) {
                    a.setDefault(false);
                    addressRepository.save(a);
                }
            }
        } else {
             // If it's the first address, make it default
             List<Address> addresses = addressRepository.findByUserId(user.getId());
             if (addresses.isEmpty()) {
                 address.setDefault(true);
             }
        }
        
        return addressRepository.save(address);
    }
    
    @Transactional
    public void deleteAddress(String email, Long addressId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
                
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));
                
        if (!address.getUser().getId().equals(user.getId())) {
             throw new RuntimeException("Not authorized to delete this address");
        }
        
        addressRepository.delete(address);
    }
}
