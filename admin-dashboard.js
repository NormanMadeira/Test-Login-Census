import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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

// Check if the user is logged in and is an admin
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // User is not logged in, redirect to homepage
    alert("Access denied. Please log in.");
    window.location.href = "index.html";
  } else {
    // Check if the user is an admin
    const adminEmails = ["normanmadeira@gmail.com"]; // Replace with your admin emails
    if (!adminEmails.includes(user.email)) {
      alert("Access denied. You are not an admin.");
      window.location.href = "index.html";
    }
  }
});

const emailList = document.getElementById("email-list");
const addError = document.getElementById("add-error");

// Load authorized emails
window.loadEmails = function () {
  getDocs(collection(db, "authorizedEmails"))
    .then((querySnapshot) => {
      emailList.innerHTML = ""; // Clear the list
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const email = data.email;
        const role = data.role;
        const createdAt = data.createdAt;

        const li = document.createElement("li");
        li.textContent = `${email} (Role: ${role}, Created: ${new Date(createdAt).toLocaleString()})`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeEmail(email);
        li.appendChild(removeBtn);

        emailList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error loading emails:", error);
    });
};

// Add email
window.addEmail = function () {
  const newEmail = document.getElementById("new-email").value.trim();
  const role = document.getElementById("role-select").value;

  if (!newEmail) {
    addError.textContent = "Enter a valid email.";
    return;
  }

  const createdAt = new Date().toISOString();

  setDoc(doc(db, "authorizedEmails", newEmail), {
    email: newEmail,
    role: role,
    createdAt: createdAt
  })
    .then(() => {
      document.getElementById("new-email").value = "";
      loadEmails();
    })
    .catch((error) => {
      addError.textContent = "Error: " + error.message;
    });
};

// Remove email
window.removeEmail = function (email) {
  deleteDoc(doc(db, "authorizedEmails", email))
    .then(() => loadEmails())
    .catch((error) => console.error("Remove error:", error));
};

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "index.html"; // Redirect to homepage
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});

// Load emails on page load
loadEmails();

// Add event listener for the Add Email button
document.getElementById("add-email-button").addEventListener("click", () => {
  if (typeof addEmail === "function") {
    addEmail();
  } else {
    console.error("addEmail is not defined.");
  }
});