async function generateProject() {
  const prompt = document.getElementById("promptInput").value.trim();
  const outputBox = document.getElementById("outputBox");
  const loading = document.getElementById("loading");

  if (!prompt) {
    alert("Please enter a project prompt!");
    return;
  }

  outputBox.innerText = "";
  loading.style.display = "block";

  try {
    const response = await fetch("https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/generate-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    console.log("Response data:", data);  // helpful for debugging

    if (data.status === "success") {
      outputBox.innerText = data.project || "✅ Project generated!";
    } else {
      outputBox.innerText = "❌ Error: " + (data.message || "Unknown error");
    }
  } catch (error) {
    outputBox.innerText = "❌ Failed to connect to backend.\n" + error.message;
  } finally {
    loading.style.display = "none";
  }
}
