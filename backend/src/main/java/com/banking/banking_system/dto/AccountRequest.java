package com.banking.banking_system.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

@Data
public class AccountRequest {

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Account holder name is required")
    private String accountHolder;

    @NotBlank(message = "Account number is required")
    private String accountNumber;

    @DecimalMin(value = "0.0", inclusive = false, message = "Initial balance must be greater than 0")
    private BigDecimal balance;
}