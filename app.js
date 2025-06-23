import('./modules/config.js').then((config) => {
  console.log('MOCK_DATA:', config.MOCK_DATA)
})

import('./modules/weather-service.js').then((service) => {
  console.time('weather-test')
  service.getCurrentWeather('Cluj').then((data) => {
    console.timeEnd('weather-test') // ~1000ms?
    console.log('Received data:', data)
    console.log('City updated?', data.name === 'Cluj')
  })
})

import('./modules/weather-service.js').then((service) => {
  console.time('coords-test');
  service.getWeatherByCoords(46.77, 23.59).then((data) => {
    console.timeEnd('coords-test'); // Ar trebui să fie ~1000ms
    console.log('Received data by coords:', data);
    console.log('Lat OK?', data.coord.lat === 46.77);
    console.log('Lon OK?', data.coord.lon === 23.59);
  });
});

import('./modules/ui-controller.js').then(({elements}) => {
    const city = document.querySelector('#city')
    city.textContent = elements.name

    const temperature = document.querySelector('#temperature')
    temperature.textContent = elements.main.temp + '°C'

    const description = document.querySelector('#description')
    description.textContent = elements.weather[0].description

    const image = document.createElement('img')
    image.src = elements.weather[1].icon
    image.length = 150
    image.height = 150
    const icon = document.querySelector('#icon')
    icon.appendChild(image)

    const humidity = document.querySelector('#humidity')
    humidity.textContent += elements.main.humidity + '%'

    const pressure = document.querySelector('#pressure')
    pressure.textContent += elements.main.pressure + ' hPa'

    const visibility = document.querySelector('#visibility')
    visibility.textContent += elements.main.visibility + '%'

    const wind = document.querySelector('#wind')
    wind.textContent += Math.round(elements.wind.speed * 3.6) + ' km/h'

    const sunrise = document.querySelector('#sunrise')
    sunrise.textContent += elements.main.sunrise.h + ':' + elements.main.sunrise.min

    const sunset = document.querySelector('#sunset')
    sunset.textContent += elements.main.sunset.h + ':' + elements.main.sunset.min
})

const setupEventListeners = () => {
  const field = document.querySelector('#city-input')
  const button = document.querySelector('#search-btn')

  field.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
    e.preventDefault()
    handleSearch()
    }
  })

  button.addEventListener('click', (e) => {
    e.preventDefault()
    handleSearch()
  })
}

const errorDisplay = document.querySelector('#error')
errorDisplay.style.display = 'none'

const handleSearch = async () => {
  try {
    const defaultCity = 'Oradea'
    const field = document.querySelector('#city-input')
    const city = field.value.trim()

    if (!isValidCity(city)) {
      throw new Error('Oraș invalid')
    }

    if(city !== defaultCity)
    {
      throw new Error('Orasul nu exista')
    }
    const loading = document.querySelector('#loading')
    const weatherDisplay = document.querySelector('#weather-display')
    const displayWeather = async () => {
    weatherDisplay.style.display = 'flex'
  }
    weatherDisplay.style.display = 'none'
    loading.style.display = 'flex'

    setTimeout(async () => {
      loading.style.display = 'none'
      await displayWeather()
      weatherDisplay.style.display = 'flex'
    }, 2000)



  } catch (err) {
    const field = document.querySelector('#city-input')
    const button = document.querySelector('#search-btn')
    let countE = 0
    let countC = 0
    field.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){
      countE = countE+1
      console.log(countE)
      }
    })

  button.addEventListener('click', (e) => {
    countC = countC+1
    console.log(countC)
  })
    errorDisplay.style.display = 'flex'
    errorDisplay.textContent += err.message
  }
}

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city)
}

document.addEventListener('DOMContentLoaded', async () => {
  const cityInput = document.querySelector('#city-input')
  const loading = document.querySelector('#loading')
  const weatherDisplay = document.querySelector('#weather-display')
  if (cityInput.value.trim() === '') {
    loading.style.display = 'none'
    weatherDisplay.style.display = 'none'
  } else {
     handleSearch()
  }

  setupEventListeners()
})




