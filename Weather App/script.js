const apiKey = "54a16b82e1d750646cc06f69cd59fdca";

async function getWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (!city) { alert("Please enter city"); return; }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok){ alert("City not found"); return; }

    const data = await res.json();
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("city-name").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;

    // ---- icon ----
    const iconCode = data.weather[0].icon; 
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("icon").src = iconUrl;

    // ---- background effect ----
    const condition = data.weather[0].main.toLowerCase(); 
    updateWeatherUI(condition);

  } catch (e) {
    alert("Error fetching data");
    console.log(e);
  }
}

function updateWeatherUI(condition) {
  document.body.className = ""; // reset body classes

  if (condition.includes("clear")) {
    document.body.classList.add("sunny");
  } else if (condition.includes("cloud")) {
    document.body.classList.add("cloudy");
  } else if (condition.includes("rain")) {
    document.body.classList.add("rainy");
  } else if (condition.includes("storm") || condition.includes("thunder")) {
    document.body.classList.add("storm");
  } else if (condition.includes("snow")) {
    document.body.classList.add("snow");
  } else {
    document.body.classList.add("cloudy"); // default fallback
  }
}

/* === Card Hover 3D Effect === */
const card = document.querySelector('.card');
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; 
  const y = e.clientY - rect.top;  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10; 
  const rotateY = ((x - centerX) / centerX) * -10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

card.addEventListener('mouseenter', () => {
  card.style.transition = 'transform 0.1s ease';
});

/* === Dark/Light Toggle (Optional) === */
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  toggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
