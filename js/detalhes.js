import { fetchCountryDetails } from "./api.js";

const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");
const detailsContent = document.getElementById("detailsContent");
const detailFlag = document.getElementById("detailFlag");
const detailName = document.getElementById("detailName");
const detailList = document.getElementById("detailList");

function showLoading(message) {
  loadingSpinner.style.display = "block";
  loadingSpinner.querySelector("p").textContent = message;
  errorMessage.style.display = "none";
  detailsContent.style.display = "none";
}

function showError(message) {
  loadingSpinner.style.display = "none";
  detailsContent.style.display = "none";
  errorMessage.style.display = "block";
  errorMessage.textContent = message;
}

function renderCountryDetails(country) {
  loadingSpinner.style.display = "none";
  errorMessage.style.display = "none";
  detailsContent.style.display = "block";

  detailFlag.src = country.flags?.png || "";
  detailFlag.alt = country.name?.common || "Bandeira";
  detailName.textContent = country.name?.common || "Nome não disponível";

  const population = country.population
    ? country.population.toLocaleString("pt-BR")
    : "Não informado";
  const capital = country.capital
    ? country.capital.join(", ")
    : "Não informado";
  const region = country.region || "Não informado";
  const subregion = country.subregion || "Não informado";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "Não informado";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((item) => item.name)
        .join(", ")
    : "Não informado";

  detailList.innerHTML = `
        <div class="info-row"><span class="label">Região</span><span class="value">${region}</span></div>
        <div class="info-row"><span class="label">Sub-região</span><span class="value">${subregion}</span></div>
        <div class="info-row"><span class="label">Capital</span><span class="value">${capital}</span></div>
        <div class="info-row"><span class="label">População</span><span class="value">${population}</span></div>
        <div class="info-row"><span class="label">Idiomas</span><span class="value">${languages}</span></div>
        <div class="info-row"><span class="label">Moedas</span><span class="value">${currencies}</span></div>
    `;
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    showError("Código do país não informado na URL.");
    return;
  }

  try {
    showLoading("Carregando detalhes do país...");
    const country = await fetchCountryDetails(code);
    renderCountryDetails(country);
  } catch (error) {
    showError(`Erro ao buscar detalhes: ${error.message}`);
  }
}

window.addEventListener("DOMContentLoaded", init);
