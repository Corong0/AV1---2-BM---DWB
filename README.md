# 🌍 Higher or Lower - Countries Game

Jogo educativo que compara a população de países usando a API REST Countries. O projeto inclui o jogo principal e uma página de detalhes que busca informações específicas de cada país selecionado.

## 📁 Estrutura do Projeto

```
av1-dwb-nome-sobrenome-2bimestre/
├── index.html
├── detalhes.html
├── js/
│   ├── api.js
│   ├── detalhes.js
│   └── script.js
├── style/
│   └── style.css
└── README.md
```

## 🎯 Funcionalidades

- Jogo "Higher or Lower" usando dados reais de população
- Botão "Detalhes" na caixa de cada país do jogo
- Navegação por lista de países para visualizar detalhes individuais
- Uso de `URLSearchParams` para enviar o código do país pela URL
- Nova requisição à API para buscar dados específicos do país selecionado
- Código organizado em módulos JavaScript

## 🚀 Como usar

1. Abra `index.html` em um navegador.
2. Aguarde o carregamento dos países.
3. Escolha o país com maior população ou clique em "Detalhes" para ver informações completas.

> Se o navegador bloquear módulos JS via `file://`, use um servidor local (`Live Server`, `python -m http.server`, etc.).

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript moderno com módulos
- API REST Countries (`https://restcountries.com`)
- Bootstrap 5

## 📌 Recursos

- Lista de países navegável
- Página de detalhes com bandeira, capital, região, sub-região, idiomas e moedas
- Feedback de carregamento e de erro
- Código modularizado e fácil de manter
- Interface responsiva

## 💡 Observações

- A página de detalhes sempre faz nova requisição ao país escolhido.
- A lista de países não revela população para não prejudicar o jogo.
- A API é chamada via `js/api.js`, deixando o código mais organizado.
