
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (response.ok) {
    // 🔐 STORE TOKEN
    localStorage.setItem("token", data.token);

    // Go to dashboard
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = data.message;
  }
}
async function logout() {
  const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
  });   
    const data = await response.json();
    if (response.ok) {
        // 🗑️ DELETE TOKEN
        localStorage.removeItem("token");
        // Go to login page
        window.location.href = "login.html";
    } else {
        document.getElementById("message").innerText = data.message;
    }
}
async function getCurrentUser() {
  const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/auth/me", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`  
    }
    });
    const data = await response.json();
    if (response.ok) {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${data.user.fullName}`;
    } else {
        document.getElementById("message").innerText = data.message;
    }
}
getCurrentUser();
