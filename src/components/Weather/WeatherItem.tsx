import { WeatherData } from "./types";

const WeatherItem = (props: { data: WeatherData; date: string, image: string }) => {
    const data: WeatherData = props.data;
    const temp = data.main.temp;

    const overlayColor = () => {
        if (temp <= -15) return "violet";
        if (temp > 15 && temp <= 0) return "blue";
        if (temp > 0 && temp <= 15) return "green";
        if (temp > 15 && temp <= 25) return "yellow";
        if (temp > 25 && temp <= 35) return "orange";
        if (temp > 35) return "red";
    }

    return (
        <div className="b-weather">
            <div className="b-weather_content">
                <div className="b-weather_main-info">
                    <div className="b-weather_current-temp">{Math.round(temp)}°</div>
                    <div className="b-weather_city">{data.name}</div>
                </div>
                <div className="b-weather_info">
                    <div className="b-weather_date">{props.date}</div>
                    <div className="b-weather_visual">{data.weather[0].description}</div>
                    <div className="b-weather_max-min">
                        <div className="b-weather_min">{Math.round(data.main.temp_min)}°</div>
                        <span className="b-weather_separator">/</span>
                        <div className="b-weather_max">{Math.round(data.main.temp_max)}°</div>
                    </div>
                    <div className="b-weather_icon-wrap">
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" className="b-weather_icon" />
                    </div>
                </div>
            </div>
            <div className="b-weather_back-wrap">
                <img src={props.image} alt="city" className="b-weather_back" />
                <div className={`b-weather_overlay ${overlayColor()}`}></div>
            </div>
        </div>
    );
};

export default WeatherItem;