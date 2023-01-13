import { nanoid } from "nanoid";
import { Loading } from "../components/Loading";
import { useAppContext } from "../context/appContext";
import Days from "./Days";

export default function Weather() {
  const { isLoading, weather, daily, error } = useAppContext();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>COULDN'T FIND CITY</p>;
  }

  return (
    <section className="weather">
      <h2 className="weather-heading">{weather[0]?.city}</h2>
      <div className="weather-intro">
        {weather[0]?.list.map((day) => {
          const {
            main: { humidity, temp },
            wind: { speed },
          } = day;
          const { description, icon, main } = day.weather[0];
          let d = new Date(day.dt * 1000);
          let dayName = days[d.getDay()];

          return (
            <div key={nanoid()} className="weather-container">
              <h4>
                {dayName} - {day.dt_txt.slice(10, 16)}
              </h4>
              <ul className="weather-container-ul">
                <img
                  src={`https://api.openweathermap.org/img/w/${icon}.png`}
                  alt="weather icon"
                />
                <li>{main}</li>
                <li>Description: {description}</li>
                <li>Wind speed: {speed}m/s</li>
                <li>Humidity: {humidity}%</li>
                <li>Temperature: {Math.ceil(temp)}℃</li>
              </ul>
            </div>
          );
        })}
      </div>

      <Days />
    </section>
  );
}
