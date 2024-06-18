const wrapper = document.querySelector(".wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Digite um link para gerar o Qr Code',
        });
        return;
    }
    generateBtn.innerText = "Gerando um Qr Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        generateBtn.innerText = "Gerar Qr Code";
        wrapper.classList.add("active");
        document.getElementById('downloadQRCodeBtn').style.display = 'block'; // Garante que o botão de download seja exibido
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()){
        wrapper.classList.remove("active");
        document.getElementById('downloadQRCodeBtn').style.display = 'none'; // Esconde o botão se o input estiver vazio
    }
});

function downloadQRCode() {
    fetch(qrImg.src)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = "QRCode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(downloadLink);
        })
        .catch(console.error);
}

// Inicialmente, esconda o botão até que o QR Code seja gerado
document.getElementById('downloadQRCodeBtn').style.display = 'none';