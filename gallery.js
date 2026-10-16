[13.10.2026 11:15] 𝓽𝓪𝓼𝓱𝓪🤍: const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search-input");
const resultsCount = document.getElementById("results-count");
const errorMessage = document.getElementById("error-message");

const filterButtons = document.querySelectorAll(".filter-button");

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("close-modal");

const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalSymbol = document.getElementById("modal-symbol");

let characters = [];
let selectedCategory = "Усі";
let searchQuery = "";

async function loadCharacters() {
    try {
        const response = await fetch("mythology.json");

        if (!response.ok) {
            throw new Error("Не вдалося завантажити базу персонажів.");
        }

        characters = await response.json();

        renderGallery();
    } catch (error) {
        gallery.innerHTML = "";

        errorMessage.textContent =
            "Помилка завантаження. Запусти сайт через Live Server у VS Code і перевір наявність mythology.json.";

        errorMessage.classList.remove("hidden");

        resultsCount.textContent = "";
        console.error(error);
    }
}

function renderGallery() {
    gallery.innerHTML = "";
    errorMessage.classList.add("hidden");

    const filteredCharacters = characters.filter(character => {
        const matchesCategory =
            selectedCategory === "Усі" ||
            character.category === selectedCategory;

        const text = (
            character.name + " " +
            character.description + " " +
            character.category
        ).toLowerCase();

        const matchesSearch = text.includes(searchQuery);

        return matchesCategory && matchesSearch;
    });

    resultsCount.textContent =
        Знайдено персонажів: ${filteredCharacters.length};

    if (filteredCharacters.length === 0) {
        const emptyMessage = document.createElement("p");

        emptyMessage.className = "empty-message";
        emptyMessage.textContent =
            "Персонажів не знайдено. Спробуй змінити пошук.";

        gallery.appendChild(emptyMessage);
        return;
    }

    filteredCharacters.forEach(character => {
        const card = document.createElement("article");
        card.className = "card";

        const image = document.createElement("img");

        image.src = character.image || "";
        image.alt = character.name;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.alt = Зображення для ${character.name} недоступне;
        });

        const content = document.createElement("div");
        content.className = "card-content";

        const title = document.createElement("h2");
        title.textContent = character.name;

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = character.category;

        const description = document.createElement("p");
        description.className = "card-description";
        description.textContent = character.description;

        const button = document.createElement("button");
        button.className = "details-button";
        button.textContent = "Дізнатися більше";

        button.addEventListener("click", () => {
            openModal(character);
        });

        content.append(title, category, description, button);
        card.append(image, content);

        gallery.appendChild(card);
    });
}

function openModal(character) {
    modalImage.src = character.image || "";
    modalImage.alt = character.name;
[13.10.2026 11:15] 𝓽𝓪𝓼𝓱𝓪🤍: modalTitle.textContent = character.name;
    modalCategory.textContent = Категорія: ${character.category};
    modalDescription.textContent = character.description;
    modalSymbol.textContent =
        character.symbol
            ? Символ або атрибут: ${character.symbol}
            : "";

    modal.classList.remove("hidden");
    closeModalButton.focus();
}

function closeModal() {
    modal.classList.add("hidden");
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        renderGallery();
    });
});

searchInput.addEventListener("input", event => {
    searchQuery = event.target.value.trim().toLowerCase();

    renderGallery();
});

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

loadCharacters();