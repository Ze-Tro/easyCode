// 4. Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом “получить информацию” (метод должен вывести имя и дату регистрации). Метод должен быть объявлен с помощью прототипов (Func.prototype...) Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”.

// У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть true/false, должно быть скрытым). Свойства определяются в момент вызова конструктора.

// У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату (например, одну неделю от момента регистрации).

// У классов-наследников метод “получить информацию” должен так же содержать информацию о дополнительных свойствах (“суперАдмин” и “срокДействия”)

/**
 * 
 * @param {String} name 
 * @param {String} regDate 
 */
function User(name, regDate) {
	this.name = name;
	this.regDate = regDate;
}

User.prototype.getInfo = function() {
	return {
		userName: this.name,
		registerDate: this.regDate,
	};
};

/**
 * 
 * @param {String} name 
 * @param {String} regDate 
 * @param {Boolean} superAdmin 
 */
function Admin(name, regDate, superAdmin) {
	User.apply(this, [name, regDate]);
	this._superAdmin = superAdmin || false;

	const info = User.prototype.getInfo.call(this);
	info.superAdminRights = this._superAdmin;

	this.getInfo = function() {
		return info;
	};
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

/**
 * 
 * @param {String} name 
 * @param {String} regDate 
 * @param {String} expDate 
 */
function Guest(name, regDate, expDate) {
	User.apply(this, [name, regDate]);
	this._extDate = expDate || '7 days';

	const info = User.prototype.getInfo.call(this);
	info.expirationDate = this._extDate;

	this.getInfo = function() {
		return info;
	};
}

Guest.prototype = Object.create(User.prototype);
Guest.prototype.constuctor = Guest;

const admin = new Admin('Igor', '20.12.2020', true);
console.log(admin.getInfo());

const guest = new Guest('Kate', '01.02.2019');
console.log(guest.getInfo());