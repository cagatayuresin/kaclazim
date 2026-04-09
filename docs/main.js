// Animation Block

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

var texts = [
  "kaç lazım",
  "---",
  "sana",
  "kaç",
  "lazım",
  "sana",
  "onu söyle",
  "---",
  "hocam nolur hocam",
  "hojajım",
  "hocaağğğm",
  "üğühüğühü",
  "---",
  "ağlamayın",
  "kalırsanız kalırsınız",
  "delikanlı gibi",
  "kabul edin olm",
  "---",
  "yazın verirsin",
  "---",
  "seneye verirsin nolcak",
  "---",
  "nasıl tasarım ama",
  "façası yanıyo",
  "---",
  "animasyonu çarptım ama",
  "çaktırmayın",
  "---",
  "backend bende ;)",
  "---",
  "hoca bol keseden verse",
  "...",
  "bilemiyorum",
  "olur gibi",
  "---",
  "frontend bilmiyorum ben",
  "---",
  "ya olm boşverin",
  "---",
  "bunlar gerçek hayatta",
  "ne işimize yarıcak ki",
  "şaka şaka",
  "yarıyo harbiden",
  "---",
];

const morphTime = 1;
const cooldownTime = 0.5;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}
animate();
// ------------------

function kaclazim() {
  const vize_notu = parseFloat(document.getElementById("vize_notu").value);
  const final_baraji = parseFloat(document.getElementById("final_baraji").value);
  const gecme_notu = parseFloat(document.getElementById("gecme_notu").value);
  const final_etki_yuzde = parseFloat(document.getElementById("final_etki_yuzde").value);

  if (document.getElementById("vize_notu").value.toLowerCase() === "elif") {
    document.getElementById("donut").innerHTML = "Bi' tanem ❤️";
    return;
  }

  if (
    isNaN(vize_notu) || vize_notu < 0 || vize_notu > 100 ||
    isNaN(final_baraji) || final_baraji < 0 || final_baraji > 100 ||
    isNaN(gecme_notu) || gecme_notu < 0 || gecme_notu > 100 ||
    isNaN(final_etki_yuzde) || final_etki_yuzde <= 0 || final_etki_yuzde > 100
  ) {
    document.getElementById("donut").innerHTML = 'beş kardeş <i class="fa-solid fa-hand fa-shake"></i>';
  } else {
    // Hesaplama: (Vize * (100 - Etki) / 100) + (Final * Etki / 100) >= GeçmeNotu
    // Final * Etki / 100 >= GeçmeNotu - (Vize * (100 - Etki) / 100)
    // Final >= (GeçmeNotu - (Vize * (100 - Etki) / 100)) * 100 / Etki
    
    const vize_etki = 100 - final_etki_yuzde;
    let final_not_en_az = (gecme_notu - (vize_notu * vize_etki / 100)) * 100 / final_etki_yuzde;

    // Sonuç barajın altındaysa baraj geçerlidir
    if (final_not_en_az < final_baraji) {
      final_not_en_az = final_baraji;
    }

    // Puanı yukarı yuvarla (örn: 34.1 lazımsa 35 almalı)
    const sonuc = Math.ceil(final_not_en_az);

    if (sonuc > 100) {
      document.getElementById("donut").innerHTML = sonuc + " (geçmiş olsun 💀)";
    } else if (sonuc <= 0) {
      document.getElementById("donut").innerHTML = "0 (geçtin bile 🎉)";
    } else {
      document.getElementById("donut").innerHTML = sonuc.toString();
    }
  }
}

// Local Storage & Course Management Blocks
let savedCourses = JSON.parse(localStorage.getItem("kaclazim_courses")) || {};
let activeCourse = null;

function loadCourses() {
    const dersListesi = document.getElementById("ders_listesi");
    dersListesi.innerHTML = "";

    const courses = Object.keys(savedCourses);

    courses.forEach(courseName => {
        const chip = document.createElement("div");
        chip.className = "ders-chip";
        if (courseName === activeCourse) {
            chip.classList.add("active");
        }
        chip.innerText = courseName;
        chip.onclick = () => dersYukle(courseName);
        dersListesi.appendChild(chip);
    });
}

function dersKaydet() {
    const dersAdi = document.getElementById("ders_adi").value.trim();
    if (!dersAdi) {
        alert("lütfen kaydetmek için bir ders adı girin.");
        return;
    }

    const data = {
        final_baraji: document.getElementById("final_baraji").value,
        gecme_notu: document.getElementById("gecme_notu").value,
        final_etki_yuzde: document.getElementById("final_etki_yuzde").value,
        vize_notu: document.getElementById("vize_notu").value
    };

    savedCourses[dersAdi] = data;
    localStorage.setItem("kaclazim_courses", JSON.stringify(savedCourses));
    activeCourse = dersAdi;

    loadCourses();
}

function dersYukle(courseName) {
    if (!savedCourses[courseName]) return;

    activeCourse = courseName;
    const data = savedCourses[courseName];

    document.getElementById("ders_adi").value = courseName;
    document.getElementById("final_baraji").value = data.final_baraji;
    document.getElementById("gecme_notu").value = data.gecme_notu;
    document.getElementById("final_etki_yuzde").value = data.final_etki_yuzde;
    document.getElementById("vize_notu").value = data.vize_notu;

    loadCourses();
    kaclazim();
}

function dersSil() {
    const dersAdi = document.getElementById("ders_adi").value.trim();
    if (!dersAdi) return;

    if (savedCourses[dersAdi]) {
        delete savedCourses[dersAdi];
        localStorage.setItem("kaclazim_courses", JSON.stringify(savedCourses));

        if (activeCourse === dersAdi) {
            activeCourse = null;
            document.getElementById("ders_adi").value = "";
        }

        loadCourses();
    }
}

// Initial load
window.onload = function() {
    loadCourses();
};
