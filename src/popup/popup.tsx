import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import './popup.css'
import 'fontsource-roboto'
import WeatherCard from './WeatherCard'

const App: React.FC<{}> = () => {
    const [cities, setCities] = useState<string[]>([
        'Toronto',
        'New York',
        'Error',
    ])

    const [cityInput, setCityInput] = useState<string>('')

    console.log(cityInput)

    return (
        <Box mx="8px" my="16px">
            <Grid container>
                <Grid item>
                    <Paper>
                        <Box px="15px" py="5px">
                            <InputBase
                                placeholder="Add a city name."
                                value={cityInput}
                                onChange={(e) => setCityInput(e.target.value)}
                            />

                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {cities.map((city, index) => (
                <WeatherCard city={city} key={index} />
            ))}
        </Box>
    )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
