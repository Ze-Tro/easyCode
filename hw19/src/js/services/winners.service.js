import { ENV } from '../config/env';
import { Http } from '../core/http.service';

export class WinnersService {
    constructor() {}

    getWinners(pageNumber = 1) {
		const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=${pageNumber}&limit=15`)
                .then((response) => {
					resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}