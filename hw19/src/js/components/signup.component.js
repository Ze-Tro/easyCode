import { SignUpService } from './../services/signup.service';
import { AuthService } from './../services/auth.service';
import { Routing } from '../core/routing.service';

export class SignUpComponent {
	constructor() {
		this._signUpService = new SignUpService(); 
		this._authService = new AuthService(); 
		this._routing = new Routing();
	}

	async beforeRender() {
		if (this._authService.token) {
			this._routing.navigate(`/users/${this._authService.userId}`);
        }
	}

	/**
	 * 
	 * @returns {HTMLElement} Sign up DOM form
	 */
	render() {
		return `
		<div class="auth-wrap d-flex mt-5">
				<div class="auth-form col col-4 mx-auto my-auto">
					<h3>Sign up to Social.</h3>
					<p class="text-secondary">Please, enter your data into all fields correct for registration to Social account.</p>
					<form name="signUpForm" novalidate>
						<div class="form-group">
							<input type="email" class="form-control form-control-sm" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
							<input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
							<input type="text" class="form-control form-control-sm mt-3" id="nickName" placeholder="nickname" required data-pattern="\S+">
							<input type="text" class="form-control form-control-sm mt-3" id="firstName" placeholder="first name" required data-pattern="\S+">
							<input type="text" class="form-control form-control-sm mt-3" id="lastName" placeholder="last name" required data-pattern="\S+">
							<input type="text" class="form-control form-control-sm mt-3" id="phoneNumber" placeholder="phone number" required data-pattern="\S+">
							<div class="form-check form-check-inline mt-3">
								<input class="form-check-input" type="radio" name="gender" id="gender_male" value="option1" checked>
								<label class="form-check-label" for="genderRadios1">
									male
								</label>
							</div>
							<div class="form-check form-check-inline">
								<input class="form-check-input" type="radio" name="gender" id="gender_female" value="option2">
								<label class="form-check-label" for="genderRadios2">
									female
								</label>
							</div>
							<input type="text" class="form-control form-control-sm mt-3" id="city" placeholder="city" required data-pattern="\S+">
							<input type="text" class="form-control form-control-sm mt-3" id="country" placeholder="country" required data-pattern="\S+">
							<!-- <div class="form-group"> -->
							<div class="form-row mt-3">
								<div class="col-4">
									<input type="text" class="form-control form-control-sm" id="date_of_birth_day" placeholder="date">
									</div>
								<div class="col">
									<input type="text" class="form-control form-control-sm" id="date_of_birth_month" placeholder="month">
								</div>
								<div class="col">
									<input type="text" class="form-control form-control-sm" id="date_of_birth_year" placeholder="year">
								</div>
							</div>
							<!-- </div> -->
							<div class="d-flex mt-5">
								<button type="submit" class="btn btn-primary btn-sm">Register me</button>
							</div>
						</div>
					</form>
				</div>
				<!-- /.auth-form -->
				<div class="auth-bg col col-6">
				</div>
				<!-- /.auth-bg -->
			</div>
			<!-- /.auth-wrap -->
		`;
	}

	afterRender() {
		document.forms['signUpForm'].addEventListener('submit', (e) => {
			e.preventDefault();

			const email = e.target.elements['email'].value;
			const password = e.target.elements['password'].value;
			const nickName = e.target.elements['nickName'].value;
			const firstName = e.target.elements['firstName'].value;
			const lastName = e.target.elements['lastName'].value;
			const phoneNumber = e.target.elements['phoneNumber'].value;
			const gender = e.target.elements['gender_male'].checked ? 'male' : 'female';
			const city = e.target.elements['city'].value;
			const country = e.target.elements['country'].value;
			const dayBirth = e.target.elements['date_of_birth_day'].value;
			const monthBirth = e.target.elements['date_of_birth_month'].value;
			const yearBirth = e.target.elements['date_of_birth_year'].value;

			const signUpObj = {
				email: email,
				password: password,
				nickname: nickName,
				first_name: firstName,
				last_name: lastName,
				phone: phoneNumber,
				gender_orientation: gender,
				city: city,
				country: country,
				date_of_birth_day: dayBirth,
				date_of_birth_month: monthBirth,
				date_of_birth_year: yearBirth
			};
			
			for (let key in signUpObj) {
				if (!signUpObj[key]) return console.log(`Enter ${key} field `);
			}
			
			this._signUpService.signUp(signUpObj)
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
}