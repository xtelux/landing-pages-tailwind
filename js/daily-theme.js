const themeSelector = document.getElementById("themeSelector");
const themeStatus = document.getElementById("themeStatus");

// Nama tema untuk ditampilkan
const themeNames = {
    khaki: "Coklat Khaki",
    light: "Light / Putih",
    blue: "Biru",
    dark: "Dark Mode"
};

// Menentukan tema berdasarkan hari dan jam
function getDailyTheme() {
    const now = new Date();

    const day = now.getDay();
    const hour = now.getHours();

    // Prioritas tema malam
    if (hour >= 18 || hour < 6) {
        return "dark";
    }

    switch (day) {
        case 1:
        case 2:
            return "khaki";

        case 3:
        case 5:
            return "light";

        case 4:
            return "blue";

        default:
            return "light";
    }
}

// Menerapkan tema
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    const themeName = themeNames[theme];

    themeStatus.textContent = `Tema aktif: ${themeName}`;
}

// Memuat pilihan pengguna
function initializeTheme() {
    const savedMode = localStorage.getItem("themeMode") || "auto";

    themeSelector.value = savedMode;

    if (savedMode === "auto") {
        applyTheme(getDailyTheme());
        themeStatus.textContent =
            `Tema otomatis: ${themeNames[getDailyTheme()]}`;
    } else {
        applyTheme(savedMode);
    }
}

// Ketika pengguna memilih tema
themeSelector.addEventListener("change", function () {
    const selectedMode = this.value;

    localStorage.setItem("themeMode", selectedMode);

    if (selectedMode === "auto") {
        const dailyTheme = getDailyTheme();

        applyTheme(dailyTheme);

        themeStatus.textContent =
            `Tema otomatis: ${themeNames[dailyTheme]}`;
    } else {
        applyTheme(selectedMode);
    }
});

// Inisialisasi pertama
initializeTheme();

// Periksa perubahan hari dan jam setiap menit
setInterval(function () {
    const selectedMode = localStorage.getItem("themeMode") || "auto";

    if (selectedMode === "auto") {
        const dailyTheme = getDailyTheme();

        applyTheme(dailyTheme);

        themeStatus.textContent =
            `Tema otomatis: ${themeNames[dailyTheme]}`;
    }
}, 60000);