package com.banking.banking_system.service;

import com.banking.banking_system.dto.LoginRequest;
import com.banking.banking_system.dto.LoginResponse;
import com.banking.banking_system.entity.Account;
import com.banking.banking_system.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AccountRepository accountRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        // Find account
        Account account = accountRepository
                .findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() ->
                        new RuntimeException("Invalid account number or password")
                );

        // Check password
        if (!passwordEncoder.matches(
                request.getPassword(),
                account.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid account number or password"
            );
        }

        // Generate JWT
        String token = jwtService.generateToken(
                account.getAccountNumber()
        );

        return new LoginResponse(
                token,
                account.getAccountNumber(),
                account.getAccountHolder()
        );
    }
}