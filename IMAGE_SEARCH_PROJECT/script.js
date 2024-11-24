// =============== access of the image link URL
const accessKey = "zLpHjRjdASzT8R6hf_lDJ-EOCJYfbeca75ishBQBgdo";

// =============== creation phase and grabbing the Elem for workStation
const formElm = document.querySelector("form");
const inputElm = document.querySelector("#search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector("#show-more-btn");

let inputData = "";
let page = 1;

// =============== workStation "FUNCTIONAL" systems

// ===== Image Search Function

async function searchImages() {
	inputData = inputElm.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

	const response = await fetch(url);
	const data = await response.json();
	const results = data.results;

	if (page === 1) {
		searchResults.innerHTML = "";
	}

	results.map((result) => {
		const imageWrapper = document.createElement("div");
		imageWrapper.classList.add("search-result");
		const image = document.createElement("img");
		image.src = result.urls.small;
		image.alt = result.alt_description;
		const imageLink = document.createElement("a");
		imageLink.href = result.links.html;
		imageLink.target = "_blank";
		imageLink.textContent = result.alt_description;

		imageWrapper.appendChild(image);
		imageWrapper.appendChild(imageLink);
		searchResults.appendChild(imageWrapper);
	});

	page++;
	if (page > 1) {
		showMore.style.display = "block";
	}
}

formElm.addEventListener("submit", (e) => {
	e.preventDefault();
	page = 1;
	searchImages();
});

showMore.addEventListener("click", (e) => {
	searchImages();
});
