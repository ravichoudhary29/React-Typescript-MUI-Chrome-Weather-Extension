import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
    Button,
    Box,
    Card,
    Switch,
    CardContent,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core'
import './options.css'
import 'fontsource-roboto'
import {
    LocalStorageOptions,
    getStoredOptions,
    setStoredOptions,
} from '../utils/storage'

type formstate = 'ready' | 'saving'

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)
    const [formState, setFormState] = useState<formstate>('ready')

    useEffect(() => {
        getStoredOptions().then((options) => setOptions(options))
    }, [])

    const handleHomeCityChange = (homeCity: string) => {
        setOptions({
            ...options,
            homeCity,
        })
    }

    const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
        setOptions({
            ...options,
            hasAutoOverlay,
        })
    }

    const handleSaveButtonClick = () => {
        setFormState('saving')
        setStoredOptions(options).then(() => {
            setTimeout(() => {
                setFormState('ready')
            }, 1000)
        })
    }

    if (!options) {
        return null
    }

    const isFieldDisabled = formState === 'saving'

    return (
        <Box mx="10%" my="2%">
            <Card>
                <CardContent>
                    <Grid container direction="column" spacing={4}>
                        <Grid item>
                            <Typography variant="h4">
                                Weather Extension Options
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Home city name
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter a home city name"
                                value={options.homeCity}
                                onChange={(e) =>
                                    handleHomeCityChange(e.target.value)
                                }
                                disabled={isFieldDisabled}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">
                                Auto toggle overlay on webpage reload
                            </Typography>
                            <Switch
                                color="primary"
                                checked={options.hasAutoOverlay}
                                onChange={(event, checked) =>
                                    handleAutoOverlayChange(checked)
                                }
                                disabled={isFieldDisabled}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveButtonClick}
                                disabled={isFieldDisabled}>
                                {formState === 'ready' ? 'Save' : 'Saving...'}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
