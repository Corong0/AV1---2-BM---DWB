import { fetchAllCountries } from "./api.js";

/* ==================== VARIÁVEIS GLOBAIS ==================== */
let countries = [];
let currentCountries = [];
let score = 0;

const loadingSpinner = document.getElementById("loadingSpinner");
const gameContent = document.getElementById("gameContent");
const totalCountriesEl = document.getElementById("totalCountries");
const countryListEl = document.getElementById("countryList");

/**
 * Busca todos os países da API REST Countries
 * Exibe feedback de carregamento durante a requisição
 */
async function fetchCountries() {
  try {
    showLoading("Carregando países...");

    countries = await fetchAllCountries();
    console.log(`${countries.length} países carregados com sucesso`);

    renderCountryList(countries);
    loadNewRound();
    showGame();
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    showError(error.message);
  }
}

function showLoading(message) {
  loadingSpinner.style.display = "block";
  loadingSpinner.querySelector("p").textContent = message;
  gameContent.style.display = "none";
}

function showGame() {
  loadingSpinner.style.display = "none";
  gameContent.style.display = "block";
}

function showError(message) {
  loadingSpinner.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h4 class="alert-heading">⚠️ Erro ao carregar dados!</h4>
            <p>${message}</p>
            <hr>
            <p class="mb-0">Verifique sua conexão e tente novamente.</p>
        </div>
    `;
}

function renderCountryList(countries) {
  totalCountriesEl.textContent = `${countries.length} países`;

  countryListEl.innerHTML = countries
    .map((country) => {
      return `
                <a href="detalhes.html?code=${encodeURIComponent(country.cca2)}" class="list-group-item list-group-item-action d-flex align-items-center">
                    <span>${country.name.common}</span>
                </a>
            `;
    })
    .join("");
}

function getPopulation(country) {
  return country.population || 0;
}

function setDetailLinks(country1, country2) {
  const leftLink = document.getElementById("detailBtnLeft");
  const rightLink = document.getElementById("detailBtnRight");

  leftLink.href = `detalhes.html?code=${encodeURIComponent(country1.cca2)}`;
  rightLink.href = `detalhes.html?code=${encodeURIComponent(country2.cca2)}`;
}

function getTwoDistinctCountries() {
  const first = countries[Math.floor(Math.random() * countries.length)];
  let second = countries[Math.floor(Math.random() * countries.length)];

  while (second.cca2 === first.cca2) {
    second = countries[Math.floor(Math.random() * countries.length)];
  }

  return [first, second];
}

/**
 * Carrega uma nova rodada com 2 países aleatórios
 */
function loadNewRound() {
  document.getElementById("message").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
  enableButtons();

  const [country1, country2] = getTwoDistinctCountries();
  currentCountries = [country1, country2];

  setDetailLinks(country1, country2);

  const flagUrl1 = `https://flagcdn.com/w320/${country1.cca2.toLowerCase()}.png`;
  document.getElementById("flag1").innerHTML =
    `<img src="${flagUrl1}" alt="${country1.name.common}" style="width: 100px; height: auto; border-radius: 8px;">`;
  document.getElementById("name1").textContent = country1.name.common;
  document.getElementById("pop1").style.display = "none";

  const flagUrl2 = `https://flagcdn.com/w320/${country2.cca2.toLowerCase()}.png`;
  document.getElementById("flag2").innerHTML =
    `<img src="${flagUrl2}" alt="${country2.name.common}" style="width: 100px; height: auto; border-radius: 8px;">`;
  document.getElementById("name2").textContent = country2.name.common;
  document.getElementById("pop2").style.display = "none";
}

/**
 * Usuário escolheu o país da esquerda
 */
function chooseLeft() {
  const pop1 = getPopulation(currentCountries[0]);
  const pop2 = getPopulation(currentCountries[1]);

  if (pop1 > pop2) {
    winRound();
  } else {
    loseRound();
  }
}

/**
 * Usuário escolheu o país da direita
 */
function chooseRight() {
  const pop1 = getPopulation(currentCountries[0]);
  const pop2 = getPopulation(currentCountries[1]);

  if (pop2 > pop1) {
    winRound();
  } else {
    loseRound();
  }
}

/**
 * Executado quando o usuário acerta
 */
function winRound() {
  score++;
  document.getElementById("score").textContent = `Score: ${score}`;

  const country1 = currentCountries[0];
  const country2 = currentCountries[1];
  const pop1 = getPopulation(country1);
  const pop2 = getPopulation(country2);

  const messageEl = document.getElementById("message");
  messageEl.textContent = `✅ Correto! ${country1.name.common} (${pop1.toLocaleString("pt-BR")}) > ${country2.name.common} (${pop2.toLocaleString("pt-BR")})`;
  messageEl.className = "message correct";

  document.getElementById("pop1").style.display = "block";
  document.getElementById("pop1").textContent =
    "👥 " + pop1.toLocaleString("pt-BR");
  document.getElementById("pop2").style.display = "block";
  document.getElementById("pop2").textContent =
    "👥 " + pop2.toLocaleString("pt-BR");

  disableButtons();
  document.getElementById("nextBtn").style.display = "block";
}

/**
 * Executado quando o usuário erra
 */
function loseRound() {
  const messageEl = document.getElementById("message");
  const country1 = currentCountries[0];
  const country2 = currentCountries[1];
  const pop1 = getPopulation(country1);
  const pop2 = getPopulation(country2);

  messageEl.textContent = `❌ Errado! ${country1.name.common} (${pop1.toLocaleString("pt-BR")}) vs ${country2.name.common} (${pop2.toLocaleString("pt-BR")}) - Game Over!`;
  messageEl.className = "message incorrect";

  document.getElementById("pop1").style.display = "block";
  document.getElementById("pop1").textContent =
    "👥 " + pop1.toLocaleString("pt-BR");
  document.getElementById("pop2").style.display = "block";
  document.getElementById("pop2").textContent =
    "👥 " + pop2.toLocaleString("pt-BR");

  disableButtons();
}

/**
 * Prossegue para a próxima rodada
 */
function nextRound() {
  loadNewRound();
}

/**
 * Desabilita os botões de escolha
 */
function disableButtons() {
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  });
}

/**
 * Habilita os botões de escolha
 */
function enableButtons() {
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  });
}

/**
 * Reseta o jogo completamente
 */
function resetGame() {
  score = 0;
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("message").textContent = "";
  enableButtons();
  loadNewRound();
}

window.resetGame = resetGame;
window.chooseLeft = chooseLeft;
window.chooseRight = chooseRight;
window.nextRound = nextRound;
window.addEventListener("DOMContentLoaded", fetchCountries);
