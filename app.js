import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
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

const homepage = document.getElementById("homepage");
const userLoginPage = document.getElementById("user-login-page");
const forgotPasswordPage = document.getElementById("forgot-password-page");
const adminLoginPage = document.getElementById("admin-login-page");

document.getElementById("user-login-btn").addEventListener("click", () => {
  homepage.style.display = "none";
  userLoginPage.style.display = "block";
});

document.getElementById("admin-login-btn").addEventListener("click", () => {
  homepage.style.display = "none";
  adminLoginPage.style.display = "block";
});

document.getElementById("back-to-home-btn").addEventListener("click", () => {
  userLoginPage.style.display = "none";
  homepage.style.display = "block";
});

document.getElementById("back-to-home-admin-btn").addEventListener("click", () => {
  adminLoginPage.style.display = "none";
  homepage.style.display = "block";
});

document.getElementById("forgot-password-btn").addEventListener("click", () => {
  userLoginPage.style.display = "none";
  forgotPasswordPage.style.display = "block";
});

document.getElementById("back-to-login-btn").addEventListener("click", () => {
  forgotPasswordPage.style.display = "none";
  userLoginPage.style.display = "block";
});

document.getElementById("user-login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Fetch email associated with the username
  getDoc(doc(db, "users", username)).then((docSnap) => {
    if (docSnap.exists()) {
      const email = docSnap.data().email;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Login successful!");
          // Redirect to user dashboard
        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    } else {
      alert("Username not found.");
    }
  });
});

document.getElementById("forgot-password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

document.getElementById("google-login-btn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Login successful!");
      // Redirect to admin dashboard
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});