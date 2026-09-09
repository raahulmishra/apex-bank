const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function readResponse(response) {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function redirectIfUnauthorized(response) {
  if (response.status !== 401 || typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("accountNumber");
  localStorage.removeItem("accountHolder");

  if (window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
}

export async function createAccount(accountData) {
  const response = await fetch(`${API_URL}/api/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountData),
  });

  const data = await readResponse(response);

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

  const data = await readResponse(response);

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

  redirectIfUnauthorized(response);

  const data = await readResponse(response);

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

  redirectIfUnauthorized(response);

  const data = await readResponse(response);

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

  redirectIfUnauthorized(response);

  const data = await readResponse(response);

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

  redirectIfUnauthorized(response);

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`,
    );
  }

  return data;
}
