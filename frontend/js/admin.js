
let currentPage = 1;
const limit = 5;

async function loadUsers() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(
    `http://localhost:5000/api/admin/users?page=${currentPage}&limit=${limit}`,
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

  document.getElementById("userTable").innerHTML = "";

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

    document.getElementById("userTable").appendChild(row);
  });

  document.getElementById("pageInfo").innerText = `Page ${data.page}`;
}

async function deactivateUser(id) {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/admin/users/${id}/deactivate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadUsers();
}

async function activateUser(id) {
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:5000/api/admin/users/${id}/activate`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadUsers();
}

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

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadUsers();
