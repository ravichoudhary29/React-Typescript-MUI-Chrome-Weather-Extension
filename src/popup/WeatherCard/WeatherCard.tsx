import React, { useEffect } from 'react'
import { fetchOpenWeatherData } from '../../utils/api'

const WeatherCard: React.FC<{
    city: string
}> = ({ city }) => {
    useEffect(() => {
        fetchOpenWeatherData(city)
            .then((data) => {
                console.log(data)
            })
            .catch((data) => console.log(data))
    }, [city])

    return <div>{city}</div>
}

export default WeatherCard
