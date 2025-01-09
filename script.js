// ALTERA MINHAS ATUAÇÕES
const textArray = ["Web Designer", "Full-Stack Developer", "Freelancer", "Designer"];
let index = 0;
const dynamicTextElement = document.getElementById("dynamic-text");

function changeText() {
  dynamicTextElement.textContent = textArray[index];
  index = (index + 1) % textArray.length;
}

setInterval(changeText, 2000);
changeText(); // Para exibir o primeiro valor imediatamente

// SISTEMA DE FILTRAGEM DE PROJETOS
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const searchBox = document.getElementById("search-box");
  const categorySelect = document.getElementById("category-select");
  const noResultsMessage = document.getElementById("no-results-message");
  const verMaisBtn = document.getElementById("verMaisBtn");
  const container = document.querySelector(".projects-container");

  let visibleCards = 0; // Quantidade inicial de cards visíveis

  // Função para calcular o número de cards por linha dinamicamente
  const calculateCardsPerRow = () => {
    const cardWidth = cards[0]?.offsetWidth || 0; // Largura de um card
    const containerWidth = container.offsetWidth; // Largura do container
    return cardWidth > 0 ? Math.floor(containerWidth / cardWidth) : 3; // Calcular cards por linha
  };

  // Atualiza o limite de cards visíveis com base no número de linhas
  const updateVisibleCards = () => {
    const cardsPerRow = calculateCardsPerRow();
    visibleCards = cardsPerRow * 2; // Duas linhas de cards
  };

  // Função para atualizar a exibição dos cards
  const updateCardDisplay = () => {
    let searchTerm = searchBox.value.toLowerCase();
    let selectedCategory = categorySelect.value;

    let visibleCount = 0; // Contador de cards visíveis
    let totalMatches = 0; // Contador de resultados da busca

    cards.forEach((card, index) => {
      const title = card.querySelector(".titulo-sec").textContent.toLowerCase();
      const description = card.querySelector(".text-card").textContent.toLowerCase();
      const category = card.dataset.category;

      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
      const matchesCategory = selectedCategory === "all" || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        totalMatches++;
        if (visibleCount < visibleCards) {
          card.classList.remove("hidden");
          visibleCount++;
        } else {
          card.classList.add("hidden");
        }
      } else {
        card.classList.add("hidden");
      }
    });

    // Exibir ou ocultar a mensagem "sem resultados"
    if (totalMatches === 0) {
      noResultsMessage.classList.remove("hidden");
      verMaisBtn.classList.add("hidden");
    } else {
      noResultsMessage.classList.add("hidden");
      verMaisBtn.classList.remove("hidden");

      // Ocultar o botão "Ver mais" se todos os resultados já estiverem visíveis
      if (totalMatches <= visibleCards) {
        verMaisBtn.classList.add("hidden");
      }
    }
  };

  // Exibir mais cards ao clicar no botão "Ver mais"
  verMaisBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Previne o comportamento padrão
    visibleCards += calculateCardsPerRow(); // Aumentar o número de cards visíveis com base no tamanho do dispositivo
    updateCardDisplay();
  });

  // Atualizar a exibição ao digitar na barra de busca
  searchBox.addEventListener("input", updateCardDisplay);

  // Atualizar a exibição ao mudar a seleção no select
  categorySelect.addEventListener("change", updateCardDisplay);

  // Recalcular o limite de cards visíveis ao redimensionar a janela
  window.addEventListener("resize", () => {
    updateVisibleCards();
    updateCardDisplay();
  });

  // Inicializar a exibição dos cards
  updateVisibleCards();
  updateCardDisplay();
});

// MENU SUPERIOR PARA DISPOSITIVOS MENORES
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu = document.querySelector(".menu");

  menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active"); // Adiciona ou remove a classe "active"
  });
});

// ALTERA ÍCONE DE SOL PARA LUA
document.getElementById('themeToggle').addEventListener('click', function() {
  var sunIcon = document.getElementById('sun-icon');
  var moonIcon = document.getElementById('moon-icon');

  // Alterna a visibilidade entre os ícones
  sunIcon.style.display = (sunIcon.style.display === 'none' ? 'block' : 'none');
  moonIcon.style.display = (moonIcon.style.display === 'none' ? 'block' : 'none');
});