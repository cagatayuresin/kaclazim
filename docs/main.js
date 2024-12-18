// Animation Block

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

var texts = [
  "kaç lazım",
  "---",
  "",
  "",
  "",
  "---",
  "sana",
  "kaç",
  "lazım",
  "sana",
  "onu söyle",
  "---",
  "",
  "",
  "",
  "---",
  "hocam nolur hocam",
  "hojajım",
  "hocaağğğm",
  "üğühüğühü",
  "---",
  "",
  "",
  "",
  "---",
  "ağlamayın",
  "kalırsanız kalırsınız",
  "delikanlı gibi",
  "kabul edin olm",
  "---",
  "",
  "",
  "",
  "---",
  "yazın verirsin",
  "---",
  "",
  "",
  "",
  "---",
  "seneye verirsin nolcak",
  "---",
  "",
  "",
  "",
  "---",
  "nasıl tasarım ama",
  "façası yanıyo",
  "---",
  "",
  "",
  "",
  "---",
  "animasyonu çarptım ama",
  "çaktırmayın",
  "---",
  "",
  "",
  "",
  "---",
  "backend bende ;)",
  "---",
  "",
  "",
  "",
  "---",
  "hoca bol keseden verse",
  "...",
  "bilemiyorum",
  "olur gibi",
  "---",
  "",
  "",
  "",
  "---",
  "frontend bilmiyorum ben",
  "---",
  "",
  "",
  "",
  "---",
  "ya olm boşverin",
  "---",
  "",
  "",
  "",
  "---",
  "bunlar gerçek hayatta",
  "ne işimize yarıcak ki",
  "şaka şaka",
  "yarıyo harbiden",
  " ",
  " ",
  "",
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
  let vize_notu = document.getElementById("vize_notu").value;
  let final_baraji = document.getElementById("final_baraji").value;
  let gecme_notu = document.getElementById("gecme_notu").value;
  let final_etki_yuzde = document.getElementById("final_etki_yuzde").value;

  if(vize_notu == "elif"){
    document.getElementById("donut").innerHTML = "Bi' tanem ❤️";
  }
  else if (
    vize_notu < 0 ||
    vize_notu > 100 ||
    final_baraji < 0 ||
    final_baraji > 100 ||
    final_etki_yuzde < 0 ||
    final_etki_yuzde > 100 ||
    gecme_notu < 0 ||
    gecme_notu > 100 ||
    isNaN(vize_notu) ||
    isNaN(final_baraji) ||
    isNaN(final_etki_yuzde) ||
    isNaN(gecme_notu)
  ){
    document.getElementById("donut").innerHTML = "bes kardes";
  } else {
    let final_not_en_az;

    final_not_en_az =
      (100 * (gecme_notu - vize_notu) + final_etki_yuzde * vize_notu) /
      final_etki_yuzde;
      
    if (final_not_en_az <= final_baraji) {
      document.getElementById("donut").innerHTML = final_baraji.toString();
    } else {
      document.getElementById("donut").innerHTML = final_not_en_az.toString();
    }
  }
}
