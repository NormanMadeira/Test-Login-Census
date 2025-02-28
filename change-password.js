import { getAuth, updatePassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

document.getElementById("change-password-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;
  const user = auth.currentUser;

  // Update password in Firebase
  updatePassword(user, newPassword)
    .then(() => {
      // Remove the password update flag
      updateDoc(doc(db, "users", user.uid), {
        requiresPasswordUpdate: false
      })
        .then(() => {
          alert("Password updated! Redirecting...");
          window.location.href = "user-dashboard.html";
        });
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});