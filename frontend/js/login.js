
const BASE_URL = "https://mini-user-management-system-1-gwj1.onrender.com";

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    document.getElementById("message").innerText = "All fields are required";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("message").innerText =
        data.message || "Login failed";
      return;
    }

    // 🔐 Save JWT token
    localStorage.setItem("token", data.token);

    // ✅ Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    document.getElementById("message").innerText =
      "Server error. Please try again later.";
  }
}
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("password").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    login();
  }
});
