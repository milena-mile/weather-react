import "./weather.scss";
import { useEffect, useState } from "react";
import { NetworkState, NetworkSuccessState } from "./types";
import cityPhoto from "../../services/imageAPI";
import getCoordinates from "../../services/getCoordinates";
import Error from "../Error/Error";
import requestAPI from "../../services/requestAPI";
import Loading from "../Loading/Loading";
import WeatherItem from "./WeatherItem";
import dayjs from "dayjs";

const APIkey = "45837cbf5217eefc3c4eb09cf83dc78f";

const Weather = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    const [data, setData] = useState<NetworkState>({state: "loading"});
    const [date, setDate] = useState(new Date().toDateString());

    const [image, setImage] = useState<string>("");

    useEffect(() => {
        setDate(dayjs(date).format("dddd, DD MMM"));

        async function getPosition(): Promise<void> {
            getCoordinates()
                .then(coordinates => {
                    setLatitude(coordinates.latitude);
                    setLongitude(coordinates.longitude);
                })

        }
        getPosition();
    }, []);

    useEffect(() => {
        if (latitude != null && longitude != null) {
            async function getData(): Promise<void> {
                requestAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`)
                    .then(data => setData(data));
            }
            getData();
        }
            
    }, [latitude, longitude]);
    
    useEffect(() => {
        if (data.state === "success") {
            async function getImage(): Promise<void> {
                const successData = data as NetworkSuccessState;
                cityPhoto(successData.response.name)
                    .then(image => {
                        if (image) setImage(image);
            }       );
            }
            getImage();
        }
           
    }, [data]);
    
    return (
        <>
            {data.state === "loading" && <Loading />}
            {data.state === "failed" && <Error />}
            {data.state === "success" && <WeatherItem data={data} date={date} image={image}/>}
        </>
    );
};

export default Weather;
