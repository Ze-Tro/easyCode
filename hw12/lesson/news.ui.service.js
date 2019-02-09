class NewsUI {
	constructor() {
		this.newsContainer = document.querySelector('.news-wrap .row');
	}

	/**
	 * 
	 * @param {Object} article 
	 */
	addArticle(article) {
		console.time();
		const template = NewsUI.generateArticleTemplate(article);
		console.timeEnd();
		this.newsContainer.appendChild(template);
		// this.newsContainer.insertAdjacentHTML("afterbegin", template);
	}

	clearContainer() {
		let first = this.newsContainer.firstElementChild;
		while (first) {
			this.newsContainer.removeChild(first);
			first = this.newsContainer.firstElementChild;
		}
	}

	/**
	 * 
	 * @param {Object} article 
	 */
	// static generateArticleTemplate(article) {
	// 	return `
	// 	<div class="col s12 m6">
	// 		<div class="card">
	// 			<div class="card-image">
	// 				<img src="${article.urlToImage}">
	// 			</div>
	// 			<div class="card-content">
	// 				<span class="card-title">${article.title || ''}</span>

	// 				<p>${article.description || ''}</p>
	// 			</div>
	// 			<div class="card-action">
	// 				<a href="${article.url}" target="_blank">Read more</a>
	// 			</div>
	// 		</div>
	// 	</div>
	// 	`;
	// }

	/**
	 * 
	 * @param {Object} article 
	 * @returns {HTMLElement} news card
	 */
	static generateArticleTemplate(article) {

		const mainWrap = document.createElement('div');
		mainWrap.classList.add('col', 's12', 'm6');
		const cardWrap = document.createElement('div');
		cardWrap.classList.add('card');
		
		const cardImage = document.createElement('div');
		cardImage.classList.add('card-image');
		const imageTag = document.createElement('img');
		imageTag.setAttribute('src', `${article.urlToImage || ''}`);
		
		
		const cardContent = document.createElement('div');
		cardContent.classList.add('card-content');
		const spanCardTitle = document.createElement('span');
		spanCardTitle.classList.add('card-title');
		const paragraphContent = document.createElement('p');
		spanCardTitle.innerText = `${article.title || ''}`;
		paragraphContent.innerText = `${article.description || ''}`;
	
		const cardAction = document.createElement('div');
		cardAction.classList.add('card-action');
		const cardActionLink = document.createElement('a');
		cardActionLink.setAttribute('href', `${article.url}`);
		cardActionLink.setAttribute('target', '_blank');cardAction.appendChild(cardActionLink);
		
		cardContent.appendChild(spanCardTitle);
		cardContent.appendChild(paragraphContent);
		cardWrap.appendChild(cardImage).appendChild(imageTag);
		cardWrap.appendChild(cardContent);
		cardWrap.appendChild(cardAction);
		mainWrap.appendChild(cardWrap);
		
		return mainWrap;
	}
}