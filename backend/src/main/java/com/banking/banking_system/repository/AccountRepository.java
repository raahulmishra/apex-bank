package com.banking.banking_system.repository;

import com.banking.banking_system.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    // Find account by account number
    Optional<Account> findByAccountNumber(String accountNumber);
}
