package com.banking.banking_system.controller;

import com.banking.banking_system.dto.AccountRequest;
import com.banking.banking_system.dto.ApiResponse;
import com.banking.banking_system.dto.TransactionRequest;
import com.banking.banking_system.entity.Account;
import com.banking.banking_system.entity.Transaction;
import com.banking.banking_system.exception.AccountNotFoundException;
import com.banking.banking_system.exception.InsufficientBalanceException;
import com.banking.banking_system.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import com.banking.banking_system.dto.ChangePasswordRequest;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // API 1: CREATE ACCOUNT
    @PostMapping
    public ResponseEntity<ApiResponse> createAccount(@Valid @RequestBody AccountRequest request) {
        try {
            Account account = accountService.createAccount(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Account created successfully", account));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    // API 2: GET BALANCE
    @GetMapping("/balance")
    public ResponseEntity<ApiResponse> getBalance(@RequestParam String accountNumber) {
        try {
            var balance = accountService.getBalance(accountNumber);
            return ResponseEntity.ok()
                    .body(new ApiResponse(true, "Balance retrieved successfully", balance));
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    // API 3: TRANSFER MONEY
    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse> transferMoney(@Valid @RequestBody TransactionRequest request) {
        try {
            Transaction transaction = accountService.transferMoney(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Transfer successful", transaction));
        } catch (InsufficientBalanceException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    // API 4: GET TRANSACTION HISTORY
    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse> getTransactionHistory(@RequestParam String accountNumber) {
        try {
            List<Transaction> transactions = accountService.getTransactionHistory(accountNumber);
            return ResponseEntity.ok()
                    .body(new ApiResponse(true, "Transactions retrieved successfully", transactions));
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    // API 5: CHANGE PASSWORD
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {
        try {

            // JWT se logged-in account number
            String accountNumber =
                    authentication.getName();

            accountService.changePassword(
                    accountNumber,
                    request.getCurrentPassword(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(
                    new ApiResponse(
                            true,
                            "Password updated successfully"
                    )
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(
                            new ApiResponse(
                                    false,
                                    e.getMessage()
                            )
                    );
        }
    }
}