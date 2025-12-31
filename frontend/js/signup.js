
const BASE_URL = "https://mini-user-management-system-1-gwj1.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  async function signup() {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageEl = document.getElementById("message");

    // Clear previous message
    messageEl.innerText = "";
    messageEl.style.color = "red";

    // Basic validation
    if (!fullName || !email || !password) {
      messageEl.innerText = "All fields are required";
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
        messageEl.innerText = data.message || "Signup failed";
        return;
      }

      // ✅ Success message
      messageEl.style.color = "green";
      messageEl.innerText = "Signup successful! Redirecting to login...";

      // Redirect to login (index.html)
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);

    } catch (error) {
      messageEl.innerText = "Server error. Please try again later.";
    }
  }

  // Button click
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", signup);
  }

  // Enter key support
  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        signup();
      }
    });
  }

});
