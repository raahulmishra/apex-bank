const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function createAccount(accountData) {
  const response = await fetch(`${API_URL}/api/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create account");
  }

  return data;
}

export async function login(accountNumber, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountNumber,
      password,
    }),
  });

  const text = await response.text();

  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Invalid account number or password");
  }

  return data;
}
export async function getBalance(accountNumber) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/accounts/balance?accountNumber=${accountNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch balance");
  }

  return data;
}

export async function getTransactions(accountNumber) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/accounts/transactions?accountNumber=${accountNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch transactions");
  }

  return data;
}

export async function transferMoney(transferData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/accounts/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transferData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Transfer failed");
  }

  return data;
}

export async function changePassword(currentPassword, newPassword) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/accounts/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  const text = await response.text();

  let data = {};

  if (text) {
    data = JSON.parse(text);
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`,
    );
  }

  return data;
}
