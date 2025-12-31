
let currentPage = 1;
const limit = 5;
const BASE_URL = "https://mini-user-management-system-1-gwj1.onrender.com";

// 🔹 Load users (Admin only)
async function loadUsers() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  const response = await fetch(
    `${BASE_URL}/api/admin/users?page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Access denied");
    logout();
    return;
  }

  const tableBody = document.getElementById("userTable");
  tableBody.innerHTML = "";

  data.users.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.fullName}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.status ? "Active" : "Inactive"}</td>
      <td>
        ${
          user.status
            ? `<button onclick="deactivateUser('${user._id}')">Deactivate</button>`
            : `<button onclick="activateUser('${user._id}')">Activate</button>`
        }
      </td>
    `;

    tableBody.appendChild(row);
  });

  document.getElementById("pageInfo").innerText = `Page ${data.page}`;
}

// 🔹 Deactivate user
async function deactivateUser(id) {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/api/admin/users/${id}/deactivate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadUsers();
}

// 🔹 Activate user
async function activateUser(id) {
  const token = localStorage.getItem("token");

  await fetch(`${BASE_URL}/api/admin/users/${id}/activate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadUsers();
}

// 🔹 Pagination
function nextPage() {
  currentPage++;
  loadUsers();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadUsers();
  }
}

// 🔹 Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// 🔹 Attach button listeners
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("nextBtn").addEventListener("click", nextPage);
document.getElementById("prevBtn").addEventListener("click", prevPage);

// 🔹 Show logged-in user in navbar
const token = localStorage.getItem("token");

if (token) {
  fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("navUser").innerText =
        `Logged in as: ${data.user.fullName}`;

      // Hide admin link for non-admin users
      if (data.user.role !== "admin") {
        document.getElementById("adminLink").style.display = "none";
      }
    });
}

// 🔹 Load users on page load
loadUsers();
