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
    console.log("API Response:", data); // 🐞 Debug

    if (data.status === "success" && data.result && data.result.project) {
      outputBox.innerText = data.result.project;
    } else {
      outputBox.innerText = "❌ Error: " + (data.message || "No project returned.");
    }
  } catch (error) {
    outputBox.innerText = "❌ Failed to connect to backend.\n" + error.message;
  } finally {
    loading.style.display = "none";
  }
}
