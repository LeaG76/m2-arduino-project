// Websocket
const ws = new WebSocket('ws://localhost:7000');

// Item recovery
	// Walkers
const walker = document.getElementById("walker");
const addWalkerButton = document.getElementById("addWalker");
const moveWalkerButton = document.getElementById("moveWalker");
const numberWalker = document.getElementById('numberWalker');
const chartWalker = document.getElementById('chartWalker');
const chartBarWalker = document.getElementById('walkerBarChart');
const chartPieWalker = document.getElementById('walkerPieChart');
const ctx1 = document.getElementById('walkerChartBar');
const ctx2 = document.getElementById('walkerChartPie');
	// Cars
const car = document.getElementById("car");
const carImg = document.getElementById("carImg");
const addCarButton = document.getElementById("addCar");
const moveCarButton = document.getElementById("moveCar");
const numberCar = document.getElementById('numberCar');
const chartCar = document.getElementById('chartCar');
const chartBarCar= document.getElementById('carBarChart');
const ctx3 = document.getElementById('carChartBar');
	// Lights
const light1 = document.getElementById("trafficLight1");
const light2 = document.getElementById("trafficLight2");
const light3 = document.getElementById("trafficLight3");
const lightWalker1 = document.getElementById("trafficLightWalker1");
const lightWalker2 = document.getElementById("trafficLightWalker2");

// Counters
let numberWalkerCount = 0;
let numberCarCount = 0;
let statusWalkerLights = "";

// Change the color of the traffic light according to the LEDs of the Arduino
ws.addEventListener('message', ev => {
	// State 1 = green light for vehicles and red light for walkers
	if(ev.data == "1") {
		light3.classList.remove("color3");
		light2.classList.remove("color2-select");
		light1.classList.remove("color1-select");
		light3.classList.add("color3-select");
		light2.classList.add("color2");
		light1.classList.add("color1");
		lightWalker1.classList.remove("color3-select");
		lightWalker2.classList.add("color1-select");
	// State 2 = orange light for vehicles and red light for walkers
	} else if(ev.data == "2") {
		light3.classList.remove("color3-select");
		light2.classList.remove("color2");
		light1.classList.remove("color1-select");
		light3.classList.add("color3");
		light2.classList.add("color2-select");
		light1.classList.add("color1");
		lightWalker1.classList.remove("color3-select");
		lightWalker2.classList.add("color1-select");
	// State 3 = red light for vehicles and green light for walkers
	} else if(ev.data == "3") {
		light3.classList.remove("color3-select");
		light2.classList.remove("color2-select");
		light1.classList.remove("color1");
		light3.classList.add("color3");
		light2.classList.add("color2");
		light1.classList.add("color1-select");
		lightWalker1.classList.add("color3-select");
		lightWalker2.classList.remove("color1-select");
	// State 4 = orange and red light for vehicles and green light for walkers
	} else if(ev.data == "4") {
		light3.classList.remove("color3-select");
		light2.classList.remove("color2");
		light1.classList.remove("color1");
		light3.classList.add("color3");
		light2.classList.add("color2-select");
		light1.classList.add("color1-select");
		lightWalker1.classList.add("color3-select");
		lightWalker2.classList.remove("color1-select");
	}
});

// Adding a walker and counting their number
addWalkerButton.addEventListener('click', () => {
	numberWalkerCount+=1;
    walker.style.display = 'block';
	numberWalker.innerHTML = numberWalkerCount;
});

// Walkers movement is activated
moveWalkerButton.addEventListener('click', () => {
	if(lightWalker1.classList.contains("color3-select")) {
		statusWalkerLights = "green";
	} else if(lightWalker2.classList.contains("color1-select")) {
		statusWalkerLights = "red";
	}

	fetch('/write-walker-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			numbers: numberWalkerCount,
			passing: statusWalkerLights
		})
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));

	fetch('/write-car-data', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			numbers: numberCarCount,
		})
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));

	ws.send("send data");

	setTimeout(() => {
		walker.classList.add("human-animation");
		
    }, "1000");

	setTimeout(() => {
	    walker.classList.remove("human-animation");
        walker.style.display = 'none';

		numberWalkerCount=0;
		numberWalker.innerHTML = numberWalkerCount;
    }, "5000");
});

// Adding a car and counting their number
addCarButton.addEventListener('click', () => {
	numberCarCount+=1;
    car.style.display = 'block';
	numberCar.innerHTML = numberCarCount;
});

// Car movement is activated (cars stop in front of the pedestrian crossing)
moveCarButton.addEventListener('click', () => {
	carImg.classList.add("car-animation-1");
	setTimeout(() => {
		carImg.classList.remove("car-animation-1");
		carImg.classList.remove("car-position-base");
		carImg.classList.add("car-position-middle");

		numberCarCount=0;
		numberCar.innerHTML = numberCarCount;
	}, "3000");
});

// If the light is green for the vehicles then the cars can continue on their way
setInterval(() => {
	if(carImg.classList.contains("car-position-middle")) {
		if(light3.classList.contains("color3-select")) {
			carImg.classList.add("car-animation-2");
			setTimeout(() => {
				carImg.classList.remove("car-animation-2");
				carImg.classList.remove("car-position-middle");
				car.style.display = 'none';
				carImg.classList.add("car-position-base");
			}, "5000");
		}
	}
}, 1000);

chartWalker.addEventListener('click', () => {
	fetch('../databases/walkers.json', {

	})
	.then(response => response.json())
	.then(data => {
		var numberWalkersData = [];
		var deplacementWalkersData = [];
		var passingWalkersData = [];
		var passing = [];
		var countGreen = 0;
		var countRed = 0;
		for(var i in data) {
			numberWalkersData.push(data[i]["numbers"]);
		}
		for(var i in data) {
			deplacementWalkersData.push(i);
		}
		for(var i in data) {
			passingWalkersData.push(data[i]["passing"]);
		}
		passingWalkersData.forEach(function(element){
			if(element == "green"){
				countGreen+=1;
			} else if(element == "red") {
				countRed+=1;
			}
		});
		passing.push(countGreen, countRed)
		console.log(passing);

		new Chart(ctx1, {
			type: 'bar',
			data: {
				labels: deplacementWalkersData,
				datasets: [{
					label: 'Nombre de piétons ',
					data: numberWalkersData,
					borderWidth: 1,
					backgroundColor: ["#ea4335ff", "#4285f4ff", "#fbbc05ff", "#34a853ff", "#525252"], 
				}]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Nombre de piétons qui traversent par déplacement',
						padding: {
							top: 20,
							bottom: 40
						},
						font: {
							size: 14,
							family: 'Poppins'
						}
					},
					legend: {
						display: false,
					}
				}
			}
		});
		
		new Chart(ctx2, {
			type: 'pie',
			data: {
				labels: ['Vert', 'Rouge'],
				datasets: [{
					label: 'Nombre de piétons ',
					data: passing,
					borderWidth: 0,
					backgroundColor: ["#34a853ff", "#ea4335ff"], 
				}]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Nombre de piétons qui passent en fonction du feu',
						padding: {
							top: 20,
							bottom: 20
						},
						font: {
							size: 14,
							family: 'Poppins'
						}
					}
				}
			}
		});

		const box1 = new WinBox({
			index: 3,
			id: "walker-window",
			title: "Graphique sur les piétons | Bar Chart",
			border: "0.2em",
			width: "450px",
			height: "300px",
			x: "60",
			y: "200",
			mount: chartBarWalker,
			onfocus: function () {
				this.setBackground('#333')
			},
			onblur: function () {
				this.setBackground('#525252')
			},
		});
		box1.removeControl("wb-full");

		const box2 = new WinBox({
			index: 2,
			id: "walker-window",
			title: "Graphique sur les piétons | Pie Chart",
			border: "0.2em",
			width: "450px",
			height: "400px",
			x: "100",
			y: "280",
			mount: chartPieWalker,
			onfocus: function () {
				this.setBackground('#333')
			},
			onblur: function () {
				this.setBackground('#525252')
			},
		});
		box2.removeControl("wb-full");
	})
	.catch(error => console.error(error));
});

chartCar.addEventListener('click', () => {

	fetch('../databases/cars.json', {

	})
	.then(response => response.json())
	.then(data => {
		var numberCarsData = [];
		var deplacementCarsData = [];
		for(var i in data) {
			numberCarsData.push(data[i]["numbers"]);
		}
		for(var i in data) {
			deplacementCarsData.push(i);
		}
		
		new Chart(ctx3, {
			type: 'bar',
			data: {
				labels: deplacementCarsData,
				datasets: [{
					label: 'Nombre de véhicules ',
					data: numberCarsData,
					borderWidth: 1,
					backgroundColor: ["#ea4335ff", "#4285f4ff", "#fbbc05ff", "#34a853ff", "#525252"], 
				}]
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Nombre de véhicules qui traversent par déplacement',
						padding: {
							top: 20,
							bottom: 40
						},
						font: {
							size: 14,
							family: 'Poppins'
						}
					},
					legend: {
						display: false,
					}
				}
			}
		});
	
		const box1 = new WinBox({
			index: 3,
			id: "walker-window",
			title: "Graphique sur les véhicules | Bar Chart",
			border: "0.2em",
			width: "450px",
			height: "300px",
			x: "1330",
			y: "200",
			mount: chartBarCar,
			onfocus: function () {
				this.setBackground('#333')
			},
			onblur: function () {
				this.setBackground('#525252')
			},
		});
		box1.removeControl("wb-full");
	})
	.catch(error => console.error(error));
});