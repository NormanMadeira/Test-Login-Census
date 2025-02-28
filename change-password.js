import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, updatePassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

const changePasswordForm = document.getElementById("change-password-form");

changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;

  const user = auth.currentUser;

  updatePassword(user, newPassword)
    .then(() => {
      // Update Firestore to indicate password has been updated
      updateDoc(doc(db, "users", user.uid), {
        requiresPasswordUpdate: false
      })
        .then(() => {
          alert("Password changed successfully!");
          window.location.href = "user-dashboard.html"; // Redirect to user dashboard
        })
        .catch((error) => {
          alert("Error updating user data: " + error.message);
        });
    })
    .catch((error) => {
      alert("Error changing password: " + error.message);
    });
});