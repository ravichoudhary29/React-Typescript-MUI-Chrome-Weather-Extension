import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { OpenWeatherData, fetchOpenWeatherData } from '../../utils/api'

const WeatherCard: React.FC<{
    city: string
}> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
    useEffect(() => {
        fetchOpenWeatherData(city)
            .then((data) => {
                console.log(data)
                setWeatherData(data)
            })
            .catch((data) => console.log(data))
    }, [city])

    if (!weatherData) {
        return <div>Loading...</div>
    }

    return (
        <Box mx={'4px'} my={'16px'}>
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h5">{weatherData.name}</Typography>
                        <Typography variant="body1">
                            {Math.round(weatherData.main.temp)}*C
                        </Typography>
                        <Typography variant="body1">
                            Feels like:
                            {Math.round(weatherData.main.feels_like)}*C
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Box>
    )
}

export default WeatherCard
