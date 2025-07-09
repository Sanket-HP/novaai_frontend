async function handleGenerate() {
  const prompt = document.getElementById("promptInput").value.trim();
  const outputBox = document.getElementById("outputBox");
  const loading = document.getElementById("loading");
  const selectedMode = document.querySelector("input[name='mode']:checked").value;

  if (!prompt) {
    alert("Please enter a project prompt!");
    return;
  }

  outputBox.innerText = "";
  loading.style.display = "block";

  const endpoint =
    selectedMode === "ai-code"
      ? "https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/ai-code"
      : "https://novaai-backend-hgh3c6f8hxhgf6cn.centralindia-01.azurewebsites.net/generate-project";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    if (data.status === "success") {
      outputBox.innerText = data.result.project || data.result.code || JSON.stringify(data.result, null, 2);
    } else {
      outputBox.innerText = "❌ Error: " + (data.message || "Something went wrong.");
    }
  } catch (error) {
    outputBox.innerText = "❌ Failed to connect to backend.\n" + error.message;
  } finally {
    loading.style.display = "none";
  }
}

function openPreview() {
  const blob = new Blob([document.getElementById("outputBox").innerText], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

function downloadAsZip() {
  const text = document.getElementById("outputBox").innerText;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "generated_project.txt"; // or change to .zip if zipped server-side
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
