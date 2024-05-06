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
    }
}

type NetworkFailedState = {
    state: "failed";
};
type NetworkLoadingState = {
    state: "loading";
};
type NetworkSuccessState = {
    state: "success";
    response: WeatherData
};

type NetworkState = NetworkSuccessState | NetworkLoadingState | NetworkFailedState;

interface WeatherItemProps {
    data: NetworkSuccessState,
    date: string,
    image: string
}

export type {NetworkState, NetworkSuccessState, WeatherData, WeatherItemProps};