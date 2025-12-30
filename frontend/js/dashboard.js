
async function loadUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in
    window.location.href = "login.html";
    return;
  }

  const response = await fetch("http://localhost:5000/api/auth/me", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById("userInfo").innerText =
      `Welcome ${data.user.fullName} (${data.user.email})`;
  } else {
    alert("Session expired");
    logout();
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadUser();
