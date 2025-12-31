
const BASE_URL = "https://mini-user-management-system-1-gwj1.onrender.com";

// 🔐 Check token
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "index.html";
}

// 👤 Get logged-in user details
fetch(`${BASE_URL}/api/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(res => {
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return res.json();
  })
  .then(data => {
    // Welcome message
    document.getElementById("welcome").innerText =
      `Welcome ${data.user.fullName}`;

    // Hide admin link for non-admin users
    if (data.user.role !== "admin") {
      document.getElementById("adminLink").style.display = "none";
    }
  })
  .catch(() => {
    // Token invalid or expired
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

// 🚪 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", logout);
