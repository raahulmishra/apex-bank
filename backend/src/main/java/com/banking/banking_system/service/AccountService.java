package com.banking.banking_system.service;

import com.banking.banking_system.exception.AccountNotFoundException;
import com.banking.banking_system.dto.AccountRequest;
import com.banking.banking_system.exception.InsufficientBalanceException;
import com.banking.banking_system.dto.TransactionRequest;
import com.banking.banking_system.entity.Account;
import com.banking.banking_system.entity.Transaction;
import com.banking.banking_system.entity.TransactionType;
import com.banking.banking_system.repository.AccountRepository;
import com.banking.banking_system.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@Transactional
public class AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // CREATE ACCOUNT
    public Account createAccount(AccountRequest request) {

        // Check if account already exists
        if (accountRepository.findByAccountNumber(request.getAccountNumber()).isPresent()) {
            throw new RuntimeException("Account number already exists");
        }

        Account account = new Account();

        account.setAccountNumber(request.getAccountNumber());
        account.setAccountHolder(request.getAccountHolder());
        account.setBalance(request.getBalance());

        // Encode password before saving
        account.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        return accountRepository.save(account);
    }

    // GET ACCOUNT BY ID
    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found with ID: " + id
                        )
                );
    }

    // GET ACCOUNT BY ACCOUNT NUMBER
    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new AccountNotFoundException(
                                "Account not found: " + accountNumber
                        )
                );
    }

    // GET BALANCE
    public BigDecimal getBalance(String accountNumber) {
        Account account = getAccountByNumber(accountNumber);
        return account.getBalance();
    }

    // TRANSFER MONEY (Main business logic)
    public Transaction transferMoney(TransactionRequest request) {

        // Validation
        if (request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException(
                    "Transfer amount must be greater than 0"
            );
        }

        // Get accounts
        Account fromAccount =
                getAccountByNumber(request.getFromAccountNumber());

        Account toAccount =
                getAccountByNumber(request.getToAccountNumber());

        // Check sufficient balance
        if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
            throw new InsufficientBalanceException(
                    "Insufficient balance. Available: "
                            + fromAccount.getBalance()
                            + ", Required: "
                            + request.getAmount()
            );
        }

        // Prevent same account transfer
        if (fromAccount.getId().equals(toAccount.getId())) {
            throw new IllegalArgumentException(
                    "Cannot transfer to the same account"
            );
        }

        // Deduct from sender
        fromAccount.setBalance(
                fromAccount.getBalance()
                        .subtract(request.getAmount())
        );

        // Add to receiver
        toAccount.setBalance(
                toAccount.getBalance()
                        .add(request.getAmount())
        );

        // Save updated accounts
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);

        // Create transaction record
        Transaction transaction = new Transaction();

        transaction.setFromAccount(fromAccount);
        transaction.setToAccount(toAccount);
        transaction.setAmount(request.getAmount());
        transaction.setType(TransactionType.TRANSFER);
        transaction.setDescription(request.getDescription());

        return transactionRepository.save(transaction);
    }

    // GET TRANSACTION HISTORY
    public List<Transaction> getTransactionHistory(String accountNumber) {

        Account account = getAccountByNumber(accountNumber);

        return transactionRepository
                .findByFromAccountIdOrToAccountId(
                        account.getId(),
                        account.getId()
                );
    }

    // CHANGE PASSWORD
    public void changePassword(
            String accountNumber,
            String currentPassword,
            String newPassword
    ) {
        Account account = getAccountByNumber(accountNumber);

        // Check current password
        if (!passwordEncoder.matches(
                currentPassword,
                account.getPassword()
        )) {
            throw new IllegalArgumentException(
                    "Current password is incorrect"
            );
        }

        // Validate new password
        if (newPassword == null || newPassword.length() < 6) {
            throw new IllegalArgumentException(
                    "New password must be at least 6 characters"
            );
        }

        // Prevent using same password
        if (passwordEncoder.matches(
                newPassword,
                account.getPassword()
        )) {
            throw new IllegalArgumentException(
                    "New password must be different from current password"
            );
        }

        // Encode and save new password
        account.setPassword(
                passwordEncoder.encode(newPassword)
        );

        accountRepository.save(account);
    }
}

