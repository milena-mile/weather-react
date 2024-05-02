interface WeatherData {
    "name": string,
    "weather": [{
        "description": string,
        "icon": string
    }],
    "main": {
        "temp": number,
        "temp_min": number,
        "temp_max": number
    },
    error?: string
}

export type {WeatherData};