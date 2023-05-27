import React, { useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@material-ui/core'
import { OpenWeatherData, fetchOpenWeatherData } from '../../utils/api'

const WeatherCardContainer: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    return (
        <Box mx={'4px'} my={'16px'}>
            <div>
                <Card>
                    <CardContent>{children}</CardContent>
                </Card>
            </div>
        </Box>
    )
}

type WeatherCardState = 'loading' | 'error' | 'ready'

const WeatherCard: React.FC<{
    city: string
}> = ({ city }) => {
    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
    const [cardState, setCardState] = useState<WeatherCardState>('loading')
    useEffect(() => {
        fetchOpenWeatherData(city)
            .then((data) => {
                console.log(data)
                setWeatherData(data)
                setCardState('ready')
            })
            .catch((data) => setCardState('error'))
    }, [city])

    if (cardState == 'loading' || cardState == 'error') {
        return (
            <WeatherCardContainer>
                <Typography variant="body1">
                    {cardState == 'loading'
                        ? 'Loading...'
                        : 'Error:could not retrive weather data for this city.'}
                </Typography>
            </WeatherCardContainer>
        )
    }

    return (
        <WeatherCardContainer>
            <Typography variant="h5">{weatherData.name}</Typography>
            <Typography variant="body1">
                {Math.round(weatherData.main.temp)}*C
            </Typography>
            <Typography variant="body1">
                Feels like:
                {Math.round(weatherData.main.feels_like)}*C
            </Typography>
        </WeatherCardContainer>
    )
}

export default WeatherCard
