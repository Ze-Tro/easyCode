import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class AuthService {

	/**
	 * 
	 * @param {String} email 
	 * @param {String} password 
	 * @returns {Promise}
	 */
    login(email, password) {
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.post(`${ENV.apiUrl}/public/auth/login`, {email, password})
                .then((response) => {
                    if (!response.auth) return reject(response); 
                    localStorage.setItem('sn_user_id', response.id);
                    localStorage.setItem('sn_user_token', response.token);
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
	}
	
	/**
	 * 
	 * @param {Object} singUpObj 
	 * @returns {Promise}
	 */
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