import { WeatherData } from "../components/Weather/types";

const RequestAPI = (link: string, setData: React.Dispatch<React.SetStateAction<WeatherData | null | undefined>>) => {
    fetch(link)
        .then(response => {
            if (!response.ok) {
                setData(undefined);
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setData(data);
        })
}

export default RequestAPI;