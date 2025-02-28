import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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
const db = getFirestore(app);

// List of admin emails
const adminEmails = ["normanmadeira@gmail.com"]; // Replace with your admin emails

// DOM elements
const homepage = document.getElementById("homepage");
const adminLoginPage = document.getElementById("admin-login-page");

// Google login for admin
document.getElementById("google-login-btn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Check if the user is an admin
      if (adminEmails.includes(user.email)) {
        alert("Login successful! Redirecting to admin dashboard...");
        // Redirect to admin dashboard
        window.location.href = "admin-dashboard.html"; // Replace with your admin dashboard URL
      } else {
        alert("Access denied. You are not an admin.");
        auth.signOut(); // Sign out the non-admin user
      }
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Back to home button for admin login page
document.getElementById("back-to-home-admin-btn").addEventListener("click", () => {
  adminLoginPage.style.display = "none";
  homepage.style.display = "block";
});