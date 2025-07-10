const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const statusText = document.getElementById("status");
const downloadBtn = document.getElementById("downloadBtn");
const previewFrame = document.getElementById("preview");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("Please enter a prompt.");
    return;
  }

  statusText.textContent = "🧠 Generating project... please wait...";
  previewFrame.style.display = "none";
  downloadBtn.style.display = "none";

  try {
    const response = await fetch("https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/generate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `prompt=${encodeURIComponent(prompt)}`,
    });

    const result = await response.json();

    if (response.ok) {
      statusText.textContent = result.message;

      // Show download button
      downloadBtn.href = "https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/download";
      downloadBtn.style.display = "block";

      // Preview frontend (fetch index.html from generated project if served)
      fetch("generated_projects/latest_project/frontend/index.html")
        .then(res => res.text())
        .then(html => {
          previewFrame.style.display = "block";
          previewFrame.srcdoc = html;
        }).catch(() => {
          previewFrame.style.display = "none";
        });

    } else {
      statusText.textContent = result.error || "❌ Something went wrong.";
    }

  } catch (error) {
    console.error("Error:", error);
    statusText.textContent = "❌ Server error. Try again.";
  }
});
