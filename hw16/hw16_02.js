// 2. Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод “получить количество этажей” и метод “установить количество этажей”).
// 	Создайте наследников этого класса: классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование.

// У жилого дома появится свойство “количество квартир на этаже”, а метод “получить количество этажей” должен вернуть объект вида {этажи: 5, всегоКвартир: 5 * количествоКвартир} 

// У торгового центра появится свойство “количество магазинов на этаже”, а метод “получить количество этажей” должен вернуть объект вида {этажи: 3, всегоМагазинов: 3 * количествоМагазинов}

// 	От каждого класса создать экземпляр (дом, торговый центр)

/**
 * 
 * @param {String} name 
 * @param {Number} numOfFloors 
 * @returns {Object}
 */
function Building(name, numOfFloors = 1) {
	this.name = name;
	this.numOfFloors = numOfFloors;

	this.getNumOfFloors = function() {
		return `Кол-во этажей в ${this.name} составляет ${this.numOfFloors}`;
	};

	this.setNumOfFloors = function(newNumOfFloors) {
		this.numOfFloors = newNumOfFloors;
	};
}

/**
 * 
 * @param {String} name 
 * @param {Number} numOfFloors 
 * @param {Number} appartsOnFloor 
 * @returns {Object}
 */
function LivingHouse(name, numOfFloors, appartsOnFloor) {
	Building.apply(this, [name, numOfFloors]);
	this.appartsOnFloor = appartsOnFloor;

	this.getAppartsOnFloor = function() {
		return {
			'Floors': this.numOfFloors,
			'Total apparts': this.numOfFloors * this.appartsOnFloor
		};
	};
}

LivingHouse.prototype = Object.create(Building.prototype);
LivingHouse.prototype.constructor = LivingHouse;

const clubHouse = new LivingHouse('Sunrise', 4, 6);
console.log(clubHouse.getAppartsOnFloor());

/**
 * 
 * @param {String} name 
 * @param {Number} numOfFloors 
 * @param {Number} storesOnFloor 
 * @returns {Object}
 */
function ShoppingMall(name, numOfFloors, storesOnFloor) {
	Building.apply(this, [name, numOfFloors]);
	this.storesOnFloor = storesOnFloor;
	
	this.getStoresOnFloor = function() {
		return {
			'Floors': this.numOfFloors,
			'Total stores': this.numOfFloors * this.storesOnFloor
		};
	};
}

ShoppingMall.prototype = Object.create(Building.prototype);
ShoppingMall.prototype.constructor = ShoppingMall;

const cityCenter = new ShoppingMall('City Center', 2, 128);
console.log(cityCenter.getStoresOnFloor());