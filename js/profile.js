window.onload = () => {
  const email = localStorage.getItem("loggedInUser") || "not-logged@example.com";
  const password = localStorage.getItem("loggedInPassword") || "********";
  const loginTime = localStorage.getItem("loginTime") || new Date().toLocaleString();

  document.getElementById("email").value = email;
  document.getElementById("password").value = password;
  document.getElementById("loginTime").value = loginTime;

  renderUserReviews();

  const savedPhoto = localStorage.getItem("profilePhoto");
  if (savedPhoto) document.getElementById("profilePhoto").src = savedPhoto;
};

function toggleEdit() {
  const form = document.getElementById('profileForm');
  const inputs = form.querySelectorAll('input');
  const isReadOnly = form.classList.contains('readonly');

  inputs.forEach(input => input.readOnly = !isReadOnly);
  form.classList.toggle('readonly');
  form.classList.toggle('editable');

  const btn = form.querySelector('.edit-btn');
  btn.textContent = isReadOnly ? 'Save Changes' : 'Edit Profile';

  if (!isReadOnly) {
    const email = document.getElementById("email").value;
    const newPassword = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
      users[email] = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('loggedInPassword', newPassword);
      alert("Profile updated successfully!");
    } else {
      alert("Something went wrong. User not found.");
    }
  }
}

function changePhoto(event) {
  const img = document.getElementById('profilePhoto');
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      localStorage.setItem("profilePhoto", reader.result);
    };
    reader.readAsDataURL(file);
  }
}

function addReview() {
  const reviewText = document.getElementById("newReview").value.trim();
  if (!reviewText) {
    alert("Please write a review before submitting.");
    return;
  }

  const now = new Date();
  const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const review = {
    text: reviewText,
    date: date,
    id: Date.now()
  };

  let reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
  reviews.push(review);
  localStorage.setItem("userReviews", JSON.stringify(reviews));
  document.getElementById("newReview").value = "";
  renderUserReviews();
}

function renderUserReviews() {
  const container = document.getElementById("userReviews");
  container.innerHTML = "";
  const reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
      🌟🌟🌟🌟🌟<br>${r.text}
      <span>Posted on: ${r.date}</span>
      <button class="delete-btn" onclick="deleteReview(${r.id})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteReview(id) {
  let reviews = JSON.parse(localStorage.getItem("userReviews")) || [];
  reviews = reviews.filter(r => r.id !== id);
  localStorage.setItem("userReviews", JSON.stringify(reviews));
  renderUserReviews();
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

function toggleReviewInput() {
  const inputBox = document.getElementById("reviewInput");
  inputBox.style.display = inputBox.style.display === "none" ? "block" : "none";
}

function showSection(id) {
  document.querySelectorAll('.section-content').forEach(sec => {
    sec.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}
