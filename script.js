const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const typeSound = new Audio("assets/type.mp3");  // Suara ketikan
const enterSound = new Audio("assets/enter.mp3"); // Suara enter

const commands = {
    help: "Perintah yang tersedia: about, badges, contact, help, clear",
    about: "Halo, saya Andre Geo! Seorang yang punya keingintahuan tinggi yang menyukai Linux, AI, Cybersecurity, dll.",
    badges: "Beberapa Badges kursus saya bisa diakses di credly.com/users/andrie-ahmad-geovani",
    contact: "Email: andrieahmadgeovani@gmail.com <br>GitHub: github.com/slideyednemo"
};

// Fungsi efek mengetik
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

// Fungsi untuk membersihkan terminal dan menampilkan prompt baru
function clearTerminal() {
    output.innerHTML = ""; // Menghapus seluruh isi terminal
    output.innerHTML = '<span class="prompt">➜ ~ </span>'; // Menampilkan prompt baru
}

// Event listener untuk input
input.addEventListener("keydown", async function(event) {
    if (event.key === "Enter") {
        let command = input.value.trim();
        input.value = "";
        enterSound.play();

        output.innerHTML += `<br><span class="prompt">➜ ~ </span>${command}<br>`;

        if (command === "clear") {
            clearTerminal(); // Panggil fungsi untuk membersihkan layar
        } else if (command in commands) {
            await typeEffect(commands[command], 30);
        } else {
            await typeEffect("Perintah tidak ditemukan. Ketik help untuk daftar perintah.", 30);
        }

        output.scrollTop = output.scrollHeight;
    } else {
        typeSound.play(); // Mainkan suara ketikan
    }
});
