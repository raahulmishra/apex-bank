package com.banking.banking_system.repository;

import com.banking.banking_system.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Get all transactions for an account (from or to)
    List<Transaction> findByFromAccountIdOrToAccountId(Long fromAccountId, Long toAccountId);

    // Get transactions for a specific account
    List<Transaction> findByFromAccountId(Long fromAccountId);
}
