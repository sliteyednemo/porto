const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const typeSound = new Audio("assets/type.mp3");  // Suara ketikan
const enterSound = new Audio("assets/enter.mp3"); // Suara enter

const commands = {
    help: "Perintah yang tersedia: <br> - <b>about</b>: Tentang saya <br> - <b>skills</b>: Keterampilan saya <br> - <b>contact</b>: Hubungi saya <br> - <b>clear</b>: Bersihkan layar",
    about: "Halo, saya Andre Geo! Seorang web developer yang menyukai Linux.",
    skills: "Saya menguasai: <br> - HTML, CSS, JavaScript <br> - PHP, Laravel <br> - Python, Flask <br> - Linux, Bash",
    contact: "Email: andregeo@example.com <br>GitHub: github.com/andregeo",
    clear: ""
};

// Fungsi untuk efek mengetik
async function typeEffect(text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        function typing() {
            if (i < text.length) {
                output.innerHTML += text[i];
                i++;
                setTimeout(typing, speed);
            } else {
                output.innerHTML += "<br>";
                resolve();
            }
        }
        typing();
    });
}

// Event listener untuk input
input.addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        let command = input.value.trim();
        input.value = "";
        enterSound.play();

        output.innerHTML += `<br><span class="prompt">➜ ~ </span>${command}<br>`;

        if (command in commands) {
            await typeEffect(commands[command], 30);
        } else {
            await typeEffect("Perintah tidak ditemukan. Ketik <b>help</b> untuk daftar perintah.", 30);
        }

        output.scrollTop = output.scrollHeight;
    } else {
        typeSound.play(); // Mainkan suara ketikan
    }
});
