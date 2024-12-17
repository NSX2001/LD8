// Šviesus/Tamsus Režimas
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Atgal į Viršų mygtukas
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function atnaujintiLaikrodi() {
    const dabar = new Date(); // Dabartinė data ir laikas
    const valandos = dabar.getHours().toString().padStart(2, '0');
    const minutes = dabar.getMinutes().toString().padStart(2, '0');
    const sekundes = dabar.getSeconds().toString().padStart(2, '0');
    
    // Laiko formatavimas
    const laikas = `${valandos}:${minutes}:${sekundes}`;
    document.getElementById('clock').textContent = laikas;
}

// Nustatome laikrodžio atnaujinimą kas sekundę
setInterval(atnaujintiLaikrodi, 1000);

// Iškart paleidžiame laikrodį
atnaujintiLaikrodi();

function issaugotiDuomenis() {
    // Gauti duomenis iš formos
    const duomenys = {
        vardas: document.getElementById('vardas').value,
        pavarde: document.getElementById('pavarde').value,
        elpastas: document.getElementById('elpastas').value,
        telefonas: document.getElementById('telefonas').value,
        adresas: document.getElementById('adresas').value.replace(/\n/g, ' '),
        klausimai: [
            parseInt(document.getElementById('klausimas1').value),
            parseInt(document.getElementById('klausimas2').value),
            parseInt(document.getElementById('klausimas3').value),
            parseInt(document.getElementById('klausimas4').value),
            parseInt(document.getElementById('klausimas5').value)
        ]
    };

    // Tikrinimai
    if (!duomenys.elpastas.includes('@')) {
        alert('Įveskite galiojantį el. pašto adresą.');
        return;
    }
    if (!duomenys.telefonas.match(/^\+?[0-9]{7,15}$/) && duomenys.telefonas !== '') {
        alert('Įveskite galiojantį telefono numerį.');
        return;
    }

    // Apskaičiuoti vidurkį
    const vidurkis = duomenys.klausimai.reduce((a, b) => a + b) / duomenys.klausimai.length;

    // Nustatyti spalvą pagal vidurkį
    let spalva = '';
    if (vidurkis <= 4) spalva = 'raudona';
    else if (vidurkis <= 7) spalva = 'oranžinė';
    else spalva = 'žalia';

    // Išvesti rezultatą į tinklapį
    const rezultatas = `<span class="${spalva}">- ${duomenys.vardas} ${duomenys.pavarde} (${duomenys.elpastas}): ${vidurkis.toFixed(2)}</span>`;
    const output = document.createElement("div");
    output.innerHTML = rezultatas;
    document.getElementById('output').appendChild(output);

    // Išvesti rezultatą į konsolę
    console.log(duomenys);
}