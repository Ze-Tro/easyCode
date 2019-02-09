const newsService = new NewsService();
const newsServiceBySearch = new NewsServiceBySearch();
const uiService = new NewsUI();

// UI Elements
const form = document.forms['newsControlForm'];
const countrySelect = form['country'];
const categorySelect = form['category'];
const searchField = form['search'];
const selectFields = form.querySelector('.select_fields');
const warningMessage = document.querySelector('.warningMessage');

function onSelectChange() {
	const country = countrySelect.value;
	const category = categorySelect.value;

	if (!country || !category) return console.error('Введите страну и категорию для поиска');

	newsService.getTopHeadlinesNews(category, country, (response) => {
		const { totalResults, articles } = response;

		// console.time();
		uiService.clearContainer();
		// console.timeEnd();

		// console.time();
		articles.forEach((article) => uiService.addArticle(article));
		// console.timeEnd();
	});
}

let fieldValue = 0;
function onSearchFieldInput() {
	fieldValue = searchField.value;

	if (fieldValue.length >= 3) {

		newsServiceBySearch.getTopHeadlinesNewsSearchFor(fieldValue, (response) => {
			const { totalResults, articles } = response;
			uiService.clearContainer();
			articles.forEach((article) => uiService.addArticle(article));

			if (fieldValue.length && articles.length === 0) {
				showWarningMessage(true);
			} else {
				showWarningMessage(false);
			}
		});
	}
}

function hideShowSelectSearch(state) {
	
	if (state) {
		selectFields.classList.add('hidden');
	}
	
	if (!state && !fieldValue) {
		selectFields.classList.remove('hidden');
		uiService.clearContainer();
	}
}

function showWarningMessage(state) {
	if (state) {
		warningMessage.classList.remove('hidden');
	} else {
		warningMessage.classList.add('hidden');
	}
}

countrySelect.addEventListener('change', onSelectChange);
categorySelect.addEventListener('change', onSelectChange);
searchField.addEventListener('focus', callback = () => hideShowSelectSearch(true));
searchField.addEventListener('blur', callback = () => hideShowSelectSearch(false));
searchField.addEventListener('keyup', onSearchFieldInput);

