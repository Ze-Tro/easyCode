// 3. Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию” (метод должен вывести имя и цену). Метод должен быть объявлен с помощью прототипов (Func.prototype...). Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”. Придумайте им по одному свойству, которые будут характерны только для этих экземпляров (например, для офисной мебели - наличие компьютерного стола или шредера). Метод “получить информацию” должен учитывать и добавленное вами новое свойство. Задача на переопределение метода у экземпляров класса.

/**
 * 
 * @param {String} name 
 * @param {Number} price 
 */
function Furniture(name, price) {
	this.name = name;
	this.price = price;
}

Furniture.prototype.getInfo = function() {
	return {
		'FurnitureName': this.name,
		'FurniturePrice': this.price
	};
};

// House furniture
const houseFurniture = new Furniture('Modern chair', 23);
houseFurniture.withTable = true;

houseFurniture.getInfo = function() {
	const furnitureInfo = Furniture.prototype.getInfo.call(this);
	furnitureInfo.WithTable = this.withTable;

	return furnitureInfo;
};

console.log(houseFurniture.getInfo());

// Office furniture
const officeFurniture = new Furniture('Book case', 57);
officeFurniture.withDoorlock = true;

officeFurniture.getInfo = function() {
	const furnitureInfo = Furniture.prototype.getInfo.call(this);
	furnitureInfo.Doorlock = this.withDoorlock;

	return furnitureInfo;
};

console.log(officeFurniture.getInfo());