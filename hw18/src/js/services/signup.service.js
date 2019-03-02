import { Http } from './../core/http.service';
import { ENV } from './../config/env';

/**
 * 
 * @param {Object} singUpObj 
 * @returns {Promise}
 */
export class SignUpService {
	signUp(singUpObj) {
		const http = new Http();

		return new Promise((resolve, reject) => {
			http.post(`${ENV.apiUrl}/public/auth/signup`, singUpObj)
				.then((response) => {
					if (response.error) return reject(response); 
					resolve(response);
				})
				.catch((err) => reject(err));
		});
	}
}