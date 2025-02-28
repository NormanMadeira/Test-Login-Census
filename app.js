import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

      // Close the popup
      if (window.opener) {
        window.opener.postMessage("login-success", "*");
        window.close(); // Close the popup
      }

      // Redirect to the admin dashboard
      window.location.href = "admin-dashboard.html";
    })
    .catch((error) => {
      console.error("Google login error:", error);
      alert("Error: " + error.message);
    });
});

// Forgot Password
document.getElementById("forgot-password-btn").addEventListener("click", () => {
  const email = prompt("Enter your email:");

  if (email) {
    // Check if the email exists in the database
    getDoc(doc(db, "authorizedEmails", email))
      .then((docSnap) => {
        if (docSnap.exists()) {
          // Email exists, send password reset email
          sendPasswordResetEmail(auth, email)
            .then(() => {
              alert("Password reset email sent!");
            })
            .catch((error) => {
              alert("Error: " + error.message);
            });
        } else {
          alert("Email not found in the database.");
        }
      })
      .catch((error) => {
        alert("Error checking email: " + error.message);
      });
  }
});

// User Login Form
document.getElementById("user-login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Fetch email associated with the username
  getDoc(doc(db, "authorizedEmails", username))
    .then((docSnap) => {
      if (docSnap.exists()) {
        const email = docSnap.data().email;

        // Sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            // Check if the user needs to update their password
            getDoc(doc(db, "users", user.uid))
              .then((userDoc) => {
                if (userDoc.exists() && userDoc.data().requiresPasswordUpdate) {
                  // Redirect to change password page
                  window.location.href = "change-password.html";
                } else {
                  // Redirect to user dashboard
                  window.location.href = "user-dashboard.html";
                }
              })
              .catch((error) => {
                console.error("Error checking password update flag:", error);
              });
          })
          .catch((error) => {
            alert("Error: " + error.message);
          });
      } else {
        alert("Username not found.");
      }
    })
    .catch((error) => {
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