import { ENV } from '../config/env';
import { Http } from '../core/http.service';

export class NewsService {
    constructor() {}

    getNews(authUserToken) {
		const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, authUserToken)
                .then((response) => {
					resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}