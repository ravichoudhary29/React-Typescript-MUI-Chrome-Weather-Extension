import React from 'react'
import ReactDOM from 'react-dom'
import WeatherCard from '../components/WeatherCard'
import { Card } from '@material-ui/core'
import './contentScript.css'

const App: React.FC<{}> = () => {
    return (
        <Card className="overlayCard">
            <WeatherCard city="Toronto" tempScale="metric" />
        </Card>
    )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
