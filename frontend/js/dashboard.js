
const token = localStorage.getItem("token");
if (!token) window.location.href = "login.html";

fetch("http://localhost:5000/api/auth/me", {
  headers: { Authorization: `Bearer ${token}` }
})
.then(res => res.json())
.then(data => {
  document.getElementById("welcome").innerText =
    `Welcome ${data.user.fullName}`;

  // Hide admin link for normal users
  if (data.user.role !== "admin") {
    document.getElementById("adminLink").style.display = "none";
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
document.getElementById("logoutBtn").addEventListener("click", logout);
