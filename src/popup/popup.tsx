import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import { fetchOpenWeatherData } from '../utils/api'

const App: React.FC<{}> = () => {
    useEffect(() => {
        fetchOpenWeatherData('Ranchi')
            .then((data) => {
                console.log(data)
                console.log(data.main.temp)
            })
            .catch((data) => console.log(data))
    }, [])
    return (
        <div>
            <img src="icon.png" />
        </div>
    )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
