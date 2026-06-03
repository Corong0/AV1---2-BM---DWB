const API_BASE = "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  const response = await fetch(`${API_BASE}/all?fields=name,cca2,population`);
  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  const countries = await response.json();
  return countries
    .filter((item) => item?.name?.common && item?.cca2)
    .sort((a, b) =>
      a.name.common.localeCompare(b.name.common, "pt-BR", {
        sensitivity: "base",
      }),
    );
}

export async function fetchCountryDetails(code) {
  const response = await fetch(
    `${API_BASE}/alpha/${code}?fields=name,cca2,capital,region,subregion,population,languages,currencies,flags`,
  );

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}
