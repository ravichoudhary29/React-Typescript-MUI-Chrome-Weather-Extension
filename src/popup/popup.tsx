import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import './popup.css'
import 'fontsource-roboto'
import WeatherCard from './WeatherCard'
import {
    setStoredCities,
    getStoredCities,
    getStoredOptions,
    LocalStorageOptions,
    setStoredOptions,
} from '../utils/storage'

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>([])
    const [cityInput, setCityInput] = useState<string>('')
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)

    useEffect(() => {
        getStoredCities().then((cities) => setCities(cities))
        getStoredOptions().then((options) => setOptions(options))
    }, [])

    const handleCityButtonClick = () => {
        if (cityInput === '') {
            return
        }
        const updatedCities = [...cities, cityInput]
        setStoredCities(updatedCities).then(() => {
            setCities([...cities, cityInput])
            setCityInput('')
        })
    }

    const handleCityDeleteButtonClick = (index: number) => {
        cities.splice(index, 1)
        const updatedCities = [...cities]
        setStoredCities(updatedCities).then(() => {
            setCities([...cities])
        })
    }

    const handleTempScaleButtonClick = () => {
        const updateOptions: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
        }
        setStoredOptions(updateOptions).then(() => {
            setOptions(updateOptions)
        })
    }

    if (!options) {
        return null
    }

    return (
        <Box mx="8px" my="16px">
            <Grid container justifyContent="space-evenly">
                <Grid item>
                    <Paper>
                        <Box px="15px" py="5px">
                            <InputBase
                                placeholder="Add a city name."
                                value={cityInput}
                                onChange={(e) => setCityInput(e.target.value)}
                            />
                            <IconButton onClick={handleCityButtonClick}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Box py="4px">
                            <IconButton onClick={handleTempScaleButtonClick}>
                                {options.tempScale === 'metric'
                                    ? '\u2103'
                                    : '\u2109'}
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {cities.map((city, index) => (
                <WeatherCard
                    tempScale={options.tempScale}
                    city={city}
                    key={index}
                    onDelete={() => handleCityDeleteButtonClick(index)}
                />
            ))}
            <Box height="16px" />
        </Box>
    )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
