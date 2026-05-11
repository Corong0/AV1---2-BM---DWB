# 🌍 Higher or Lower - Countries Game

Um jogo interativo onde você deve adivinhar qual país tem a maior população entre dois países apresentados.

## 📁 Estrutura do Projeto

```
RayAV1/
├── index.html          # Arquivo principal (HTML)
├── js/
│   └── script.js       # Lógica do jogo (JavaScript)
├── style/
│   └── style.css       # Estilos (CSS)
└── README.md          # Este arquivo
```

## 🎮 Como Funciona

1. **Carregamento**: O jogo busca dados de todos os países da API REST Countries
2. **Rodada**: Dois países são exibidos com suas bandeiras
3. **Escolha**: Você clica em "Esquerda" ou "Direita" para escolher qual tem maior população
4. **Resultado**: 
   - ✅ **Acerto**: +1 ponto, mostra as populações, e você continua
   - ❌ **Erro**: Game Over, mostra as populações reais, clique "Novo Jogo" para reiniciar

## 🚀 Como Usar

1. Abra `index.html` em seu navegador
2. Clique nos botões para escolher qual país tem maior população
3. Compete e veja quantas rodadas consegue ganhar!

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilos responsivos com gradiente
- **JavaScript**: Lógica do jogo e integração com API
- **API REST Countries**: Dados dos países (https://restcountries.com)
- **Flag CDN**: Imagens das bandeiras (https://flagcdn.com)

## 📊 Recursos

- ✅ Bandeiras reais dos países
- ✅ Comparação de populações
- ✅ Sistema de pontuação
- ✅ Design responsivo (desktop e mobile)
- ✅ Código bem organizado e comentado

## 📝 Notas

- A API fornece dados em tempo real
- O jogo é infinito - continue jogando enquanto conseguir acertar
- Os números são formatados com separador de milhares
- A interface é acessível e fácil de usar

## 📧 Autor

Desenvolvido como um jogo educativo usando API pública de países.
