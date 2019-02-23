// 1. Есть класс Planet
function Planet(name) {
	this.name = name;
	this.getName = function() {
		return 'Planet name is ' + this.name;
	};
}
// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет принимать, кроме name, название спутника (satelliteName). Переопределите метод getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку + дополнительный текст 'The satellite is' + satelliteName.
// Например:

/**
 * 
 * @param {String} name 
 * @param {String} satellite 
 * @returns {String} String
 */
function PlanetWithSatellite(name, satellite = 'none') {
	Planet.call(this,name);
	this.satellite = satellite;
	const planetName = this.getName();

	this.getName = function() {
		return `${planetName}. The satellite is ${this.satellite}.`;
	};
}

PlanetWithSatellite.prototype = Object.create(Planet.prototype);
PlanetWithSatellite.prototype.constructor = PlanetWithSatellite;

const earth = new PlanetWithSatellite('earth', 'moon');
console.log(earth.getName());