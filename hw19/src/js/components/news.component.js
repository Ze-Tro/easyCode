import { AuthService } from '../services/auth.service';
import { Routing } from '../core/routing.service';
import { NewsService } from '../services/news.servise';

export class NewsComponent {
	constructor() {
		this._authService = new AuthService();
		this._newsService = new NewsService();
		this._routing = new Routing();
		this._authUserToken = this._authService.token;
		this._news = '';
	}
	/**
	 * @returns {}
	 */
	async beforeRender() {
		if (this._authUserToken) {
			this._news = await this._newsService.getNews(this._authUserToken);
		}
	}

	/**
	 * @returns {HTMLElement} News DOM block
	 */
	render() {
		// if (!this._authUserToken) {
		// 	return this._routing.navigate('/login');
		// }
		const news = this._news.news.reduce((res, item) => {
			const newsItem =`
				<div class="row news_item">
						<div class="owner col-2">
							<img class="owner_avatar" src="${item.owner.avatar}" alt="User avatar">
							<p class="owner_name">${item.owner.full_name}</p>
						</div>
						<div class=" col-sm">
							<img class="user_picture" src="${item.pictures[0].url}" alt="Some image">
						</div>
				</div>`;
			return res + newsItem;
		}, '');

		return `
			<div class="container-fluid wrap main">
			<style>${this._style()}</style>
				${news}
			</div>
		`;
	}

	/**
	 * @returns {HTMLStyleElement} Style element for News-item block
	 */
	_style() {
		return `
		.main {
			background-color: rgb(33, 33, 33);
			padding: 60px 50px 0 50px;
		}
		.news_item {
			padding-bottom: 60px;
		}
		.owner{
			margin: 0 auto;
		}
		.owner_avatar {
			display: block;
			margin: 0 auto; 
			border-radius: 50%;
			width: 80%;
		}
		.owner_name {
			margin-top: 3vw;
			font-size: 1.2vw;
			color: #ffffff;
			text-align: center;
		}
		.user_picture {
			width: 100%;
		}`;
	}

	afterRender() {}
}