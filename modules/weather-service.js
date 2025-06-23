import { MOCK_DATA } from './config.js';

export const getCurrentWeather = async (city) => {
  try
  {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if(!city || typeof city !== 'string') throw new Error('Oras invalid')
    const update = {
        ...MOCK_DATA,
        name: city
    }
    return update
  }
  catch(err)
  {
    console.error('Eroare: ', err.message)
    return null
  }
}

export const getWeatherByCoords = async (lat, lon) => {
  try
  {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if(!lat || !lon || typeof lat !== 'number' || typeof lon !== 'number') throw new Error('Oras invalid')
    const update = {
        ...MOCK_DATA,
        coord: {
        lat: lat,
        lon: lon
        }
    }
    return update
  }
  catch(err)
  {
    console.error('Eroare: ', err.message)
    return null
  }
}
