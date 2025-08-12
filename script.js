// Update quality value display
document.getElementById("quality").addEventListener("input", function () {
  document.getElementById("qualityValue").textContent = this.value;
});

// Convert images
document.getElementById("convertBtn").addEventListener("click", function () {
  const files = document.getElementById("upload").files;
  const format = document.getElementById("format").value;
  const quality = parseInt(document.getElementById("quality").value) / 100;

  if (!files.length) {
    alert("Please select at least one image.");
    return;
  }

  document.getElementById("results").innerHTML = "";

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          function (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download =
              file.name.replace(/\.[^/.]+$/, "") + "." + format.split("/")[1];
            link.className = "download-btn";
            link.textContent = "Download " + file.name;

            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            resultItem.innerHTML = `<strong>${file.name}</strong>`;
            resultItem.appendChild(link);
            document.getElementById("results").appendChild(resultItem);
          },
          format,
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});
