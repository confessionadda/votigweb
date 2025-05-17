const voterId = localStorage.getItem("hasVoted");

if (voterId) {
  document.getElementById("nomineeList").innerHTML = "<p>❌ You have already voted!</p>";
} else {
  const listRef = db.collection("nominations").orderBy("timestamp", "desc");
  listRef.get().then((snapshot) => {
    snapshot.forEach(doc => {
      const nominee = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>@${nominee.username}</strong> (${nominee.year} - ${nominee.branch})</p>
        <button onclick="vote('${doc.id}')">Vote</button>
        <hr>
      `;
      document.getElementById("nomineeList").appendChild(div);
    });
  });
}

function vote(nomineeId) {
  db.collection("nominations").doc(nomineeId).update({
    votes: firebase.firestore.FieldValue.increment(1)
  }).then(() => {
    alert("✅ Vote submitted successfully!");
    localStorage.setItem("hasVoted", "true");
    location.reload();
  });
}
