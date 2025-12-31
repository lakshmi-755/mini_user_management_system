
const BASE_URL = "https://mini-user-management-system-1-gwj1.onrender.com";

async function signup() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Basic validation
  if (!fullName || !email || !password) {
    document.getElementById("message").innerText = "All fields are required";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fullName, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("message").innerText =
        data.message || "Signup failed";
      return;
    }

    // ✅ Success message
    document.getElementById("message").innerText =
      "Signup successful! Redirecting to login...";

    // Redirect to login page after short delay
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (error) {
    document.getElementById("message").innerText =
      "Server error. Please try again later.";
  }
}

// Button click
document.getElementById("signupBtn").addEventListener("click", signup);

// Enter key support
document.getElementById("password").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    signup();
  }
});
