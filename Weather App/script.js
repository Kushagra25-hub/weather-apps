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
    const iconCode = data.weather[0].icon; // eg: 10d
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("icon").src = iconUrl;

  } catch (e) {
    alert("Error fetching data");
    console.log(e);
  }
}


// Mode switch
const toggle = document.getElementById("toggle");
toggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  toggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
