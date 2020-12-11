const cleanForm = () => {
	document.getElementById('location').value = '';
	document.getElementById('date').value = '';
};

const validateInput = (locationInput, dateInput) => {
	return locationInput === '' || dateInput === '' ? true : false;
};

const postTravel = (dataObject) => {
	return fetch('api/travel', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataObject),
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.ok) {
				cleanForm();
				updateUI(res.respond);
			}
		})
		.catch((err) => console.log('postTravel Error:', err));
};

const updateUI = (response) => {
	const cardContainerDiv = document.getElementById('result');

	const cardDiv = document.createElement('div');
	cardDiv.classList.add('card');

	const img = document.createElement('img');
	img.classList.add('img-card');
	img.setAttribute('src', response.pixabayObject.largeImageURL);
	img.setAttribute('alt', `${response.geonamesObject.toponymName} view`);

	const textDiv = document.createElement('div');
	textDiv.classList.add('content');
	textDiv.classList.add('open-sans');

	const destinySpan = document.createElement('span');
	destinySpan.classList.add('text-base');
	destinySpan.classList.add('destiny');
	destinySpan.textContent = `My trip to: ${response.geonamesObject.toponymName}, ${response.geonamesObject.countryName}`;
	const dateSpan = document.createElement('span');
	dateSpan.classList.add('text-base');
	dateSpan.classList.add('destiny');
	dateSpan.textContent = `Departing: ${response.weatherObject.dayWeather.valid_date}`;
	const populationSpan = document.createElement('span');
	populationSpan.classList.add('text-md');
	populationSpan.textContent = `Population: ${response.geonamesObject.population}`;
	const latSpan = document.createElement('span');
	latSpan.classList.add('text-md');
	latSpan.textContent = `Latitude: ${response.geonamesObject.lat}`;
	const lngSpan = document.createElement('span');
	lngSpan.classList.add('text-md');
	lngSpan.textContent = `Longitude: ${response.geonamesObject.lng}`;
	const highSpan = document.createElement('span');
	highSpan.classList.add('text-md');
	highSpan.textContent = `High Temperature: ${response.weatherObject.dayWeather.max_temp}`;
	const lowSpan = document.createElement('span');
	lowSpan.classList.add('text-md');
	lowSpan.textContent = `Low Temperature: ${response.weatherObject.dayWeather.low_temp}`;
	const weatherSpan = document.createElement('span');
	weatherSpan.classList.add('text-md');
	weatherSpan.textContent = `${response.weatherObject.dayWeather.weather.description} throughout the day.`;

	textDiv.appendChild(destinySpan);
	textDiv.appendChild(dateSpan);
	textDiv.appendChild(populationSpan);
	textDiv.appendChild(latSpan);
	textDiv.appendChild(lngSpan);
	textDiv.appendChild(highSpan);
	textDiv.appendChild(lowSpan);
	textDiv.appendChild(weatherSpan);

	cardDiv.appendChild(img);
	cardDiv.appendChild(textDiv);

	cardContainerDiv.appendChild(cardDiv);
};

const handleSubmit = (event) => {
	event.preventDefault();

	const locationInput = document.getElementById('location').value;
	const dateInput = document.getElementById('date').value;

	if (validateInput(locationInput, dateInput)) {
		alert('all fields should be completed');
		return;
	}

	const dataObject = {
		location: locationInput,
		date: dateInput,
	};

	postTravel(dataObject);
};

const handleBar = (event) => {
	event.preventDefault();
	const bar = document.getElementById('options-menu');

	bar.classList.toggle('visible');
	console.log(bar.classList);
};

document.addEventListener('DOMContentLoaded', () => {
	//Add click event for submit Button.
	const submitBtn = document.getElementById('submit');
	submitBtn.addEventListener('click', handleSubmit);

	//Add click event for bar Button.
	const barBtn = document.getElementById('bar');
	barBtn.addEventListener('click', handleBar);
});

export { handleSubmit, handleBar, cleanForm, validateInput, postTravel, updateUI };
