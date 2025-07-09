const BASE_URL = "https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net";

// Main function to generate a project
async function generateProject() {
  const promptInput = document.getElementById("promptInput");
  const outputBox = document.getElementById("outputBox");
  const loading = document.getElementById("loading");

  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("❗ Please enter a project prompt.");
    return;
  }

  // Reset output and show loading
  outputBox.innerText = "";
  loading.style.display = "block";

  try {
    const response = await fetch(`${BASE_URL}/generate-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();

    if (response.ok && data.status === "success") {
      const resultText = data.result.project || JSON.stringify(data.result, null, 2);
      outputBox.innerText = resultText;
    } else {
      outputBox.innerText = `❌ Error: ${data.message || "Something went wrong."}`;
    }
  } catch (error) {
    outputBox.innerText = `❌ Failed to connect to backend.\nError: ${error.message}`;
  } finally {
    loading.style.display = "none";
  }
}
