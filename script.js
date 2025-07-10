document.getElementById("generateBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const status = document.getElementById("status");
  const preview = document.getElementById("preview");
  const downloadBtn = document.getElementById("downloadBtn");

  if (!prompt) {
    status.textContent = "Please enter a project idea.";
    return;
  }

  status.textContent = "🔄 Generating project using AI...";
  downloadBtn.style.display = "none";
  preview.style.display = "none";

  try {
    const response = await fetch("https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/generate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ prompt }),
    });

    const result = await response.json();

    if (response.ok) {
      status.textContent = "✅ Project generated successfully!";
      downloadBtn.href = "https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/download";
      downloadBtn.style.display = "inline-block";

      preview.src = "https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/generated_projects/latest_project/frontend/index.html";
      preview.style.display = "block";
    } else {
      status.textContent = "❌ Failed to generate project: " + result.error;
    }
  } catch (error) {
    console.error("Error:", error);
    status.textContent = "❌ Network or server error.";
  }
});
