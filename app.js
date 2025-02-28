import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNEyQ9rAzMzmMKJJI50XFqvYSOPfsgsrU",
  authDomain: "test-login-census.firebaseapp.com",
  projectId: "test-login-census",
  storageBucket: "test-login-census.firebasestorage.app",
  messagingSenderId: "261189020043",
  appId: "1:261189020043:web:e654a47e82d4d494d1678e",
  measurementId: "G-02VX2EBF5E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const homepage = document.getElementById("homepage");
const userLoginPage = document.getElementById("user-login-page");
const adminLoginPage = document.getElementById("admin-login-page");

// User Login Button
document.getElementById("user-login-btn").addEventListener("click", () => {
  homepage.style.display = "none";
  userLoginPage.style.display = "block";
});

// Admin Login Button
document.getElementById("admin-login-btn").addEventListener("click", () => {
  homepage.style.display = "none";
  adminLoginPage.style.display = "block";
});

// Google Login for Admin
document.getElementById("google-login-btn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google login successful");
      alert("Login successful! Redirecting to admin dashboard...");
      window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
    })
    .catch((error) => {
      console.error("Google login error:", error);
      alert("Error: " + error.message);
    });
});

// Back to Home Button (User Login Page)
document.getElementById("back-to-home-btn").addEventListener("click", () => {
  userLoginPage.style.display = "none";
  homepage.style.display = "block";
});

// Back to Home Button (Admin Login Page)
document.getElementById("back-to-home-admin-btn").addEventListener("click", () => {
  adminLoginPage.style.display = "none";
  homepage.style.display = "block";
});