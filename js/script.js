/* ==================== VARIÁVEIS GLOBAIS ==================== */
let countries = [];
let currentCountries = [];
let score = 0;

/* ==================== API & DADOS ==================== */
/**
 * Busca todos os países da API REST Countries
 * Exibe feedback de carregamento durante a requisição
 */
async function fetchCountries() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const gameContent = document.getElementById('gameContent');

    try {
        // Mostrar spinner de carregamento
        loadingSpinner.style.display = 'block';
        gameContent.style.display = 'none';

        // Fetch dos dados
        const response = await fetch(
            'https://restcountries.com/v3.1/all?fields=name,cca2,population'
        );

        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        countries = await response.json();
        console.log(`${countries.length} países carregados com sucesso`);

        // Ocultar spinner e mostrar jogo
        loadingSpinner.style.display = 'none';
        gameContent.style.display = 'block';

        loadNewRound();
    } catch (error) {
        console.error('Erro ao buscar países:', error);
        loadingSpinner.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">⚠️ Erro ao carregar dados!</h4>
                <p>${error.message}</p>
                <hr>
                <p class="mb-0">Verifique sua conexão e tente novamente.</p>
            </div>
        `;
    }
}

/**
 * Obtém a população de um país, com fallback para 0
 */
function getPopulation(country) {
    return country.population || 0;
}

/* ==================== GAME LOGIC ==================== */
/**
 * Carrega uma nova rodada com 2 países aleatórios
 */
function loadNewRound() {
    // Limpar estado anterior
    document.getElementById('message').textContent = '';
    document.getElementById('nextBtn').style.display = 'none';
    enableButtons();

    // Selecionar 2 países aleatórios
    const country1 = countries[Math.floor(Math.random() * countries.length)];
    const country2 = countries[Math.floor(Math.random() * countries.length)];

    currentCountries = [country1, country2];

    // Exibir país 1
    const flagUrl1 = `https://flagcdn.com/w320/${country1.cca2.toLowerCase()}.png`;
    document.getElementById('flag1').innerHTML = 
        `<img src="${flagUrl1}" alt="${country1.name.common}" 
            style="width: 100px; height: auto; border-radius: 8px;">`;
    document.getElementById('name1').textContent = country1.name.common;
    document.getElementById('pop1').style.display = 'none';

    // Exibir país 2
    const flagUrl2 = `https://flagcdn.com/w320/${country2.cca2.toLowerCase()}.png`;
    document.getElementById('flag2').innerHTML = 
        `<img src="${flagUrl2}" alt="${country2.name.common}" 
            style="width: 100px; height: auto; border-radius: 8px;">`;
    document.getElementById('name2').textContent = country2.name.common;
    document.getElementById('pop2').style.display = 'none';
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
    document.getElementById('score').textContent = `Score: ${score}`;

    const country1 = currentCountries[0];
    const country2 = currentCountries[1];
    const pop1 = getPopulation(country1);
    const pop2 = getPopulation(country2);

    // Mostrar mensagem de acerto
    const messageEl = document.getElementById('message');
    messageEl.textContent = 
        `✅ Correto! ${country1.name.common} (${pop1.toLocaleString()}) > ${country2.name.common} (${pop2.toLocaleString()})`;
    messageEl.className = 'message correct';

    // Exibir populações
    document.getElementById('pop1').style.display = 'block';
    document.getElementById('pop1').textContent = '👥 ' + pop1.toLocaleString();
    document.getElementById('pop2').style.display = 'block';
    document.getElementById('pop2').textContent = '👥 ' + pop2.toLocaleString();

    // Preparar para próxima rodada
    disableButtons();
    document.getElementById('nextBtn').style.display = 'block';
}

/**
 * Executado quando o usuário erra
 */
function loseRound() {
    const messageEl = document.getElementById('message');
    const country1 = currentCountries[0];
    const country2 = currentCountries[1];
    const pop1 = getPopulation(country1);
    const pop2 = getPopulation(country2);

    // Mostrar mensagem de erro
    messageEl.textContent = 
        `❌ Errado! ${country1.name.common} (${pop1.toLocaleString()}) vs ${country2.name.common} (${pop2.toLocaleString()}) - Game Over!`;
    messageEl.className = 'message incorrect';

    // Exibir populações
    document.getElementById('pop1').style.display = 'block';
    document.getElementById('pop1').textContent = '👥 ' + pop1.toLocaleString();
    document.getElementById('pop2').style.display = 'block';
    document.getElementById('pop2').textContent = '👥 ' + pop2.toLocaleString();

    // Desabilitar botões
    disableButtons();
}

/* ==================== CONTROLES ==================== */
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
    document.querySelectorAll('.choice-btn').forEach((btn) => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    });
}

/**
 * Habilita os botões de escolha
 */
function enableButtons() {
    document.querySelectorAll('.choice-btn').forEach((btn) => {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
    });
}

/**
 * Reseta o jogo completamente
 */
function resetGame() {
    score = 0;
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('message').textContent = '';
    enableButtons();
    loadNewRound();
}

/* ==================== INICIALIZAÇÃO ==================== */
window.addEventListener('DOMContentLoaded', fetchCountries);
