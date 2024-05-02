import "./weather.scss";
import { useEffect, useState } from "react";
import { WeatherData } from "./types";
import CityPhoto from "../../services/ImageAPI";
import Coordinates from "../../services/Coordinates";
import Error from "../Error/Error";
import RequestAPI from "../../services/RequestAPI";
import Loading from "../Loading/Loading";
import WeatherItem from "./WeatherItem";
import dayjs from "dayjs";

const APIkey = "45837cbf5217eefc3c4eb09cf83dc78f";

const Weather = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [data, setData] = useState<WeatherData | null | undefined>(null);
    const [date, setDate] = useState(new Date().toDateString());

    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        setDate(dayjs(date).format("dddd, DD MMM"));

        async function getData() {
            await Coordinates(setLatitude, setLongitude);
        }
        getData();
    }, []);

    useEffect(() => {
        if (latitude != null && longitude != null)
            RequestAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`, setData);
    }, [latitude, longitude]);
    
    useEffect(() => {
        if (data != null) CityPhoto(data.name, setImage);
    }, [data]);
    
    return (
        <>
            {data === null && <Loading />}
            {data === undefined && <Error />}
            {(data != null && image != null) && <WeatherItem data={data} date={date} image={image}/>}
        </>
    );
};

export default Weather;
