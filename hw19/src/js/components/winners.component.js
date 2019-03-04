import { Routing } from '../core/routing.service';
import { WinnersService } from '../services/winners.service';

export class WinnersComponent {
	constructor() {
		this._winnersService = new WinnersService();
		this._routing = new Routing();
		this._winners = '';

	}

	async beforeRender(pageNumber) {
		this._winners = await this._winnersService.getWinners(pageNumber);
	}

	/**
	 * @returns {HTMLElement} News DOM block
	 */
	render() {
		const winners = this._winners.winners.reduce((res, item) => {

			const winnersItem =`
				<div class=" col-3">
					<img class="winner_picture" src="${item.member_id.images[0].image_basic.url}" alt="Some image">
				</div>
		`;
			return res + winnersItem;
		}, '');

		return `
			<div class="container-fluid main">
				<div class="row winners_item">
					<style>${this._style()}</style>
					${winners}
				</div>
			</div>
		`;
	}

	_style() {
		return `
		.main {
			background-color: rgb(33, 33, 33);
			padding: 60px 50px 0 50px;
		}
		.winners_item {
			padding-bottom: 60px;
		}
		.winner_picture {
			width: 100%;
			margin-bottom: 20px;
		}`;
	}

	/**
	 * Tried to load another part of winners' photo
	 * but it's doesn't work yet
	 * 
	 */
	afterRender() {
	}
}