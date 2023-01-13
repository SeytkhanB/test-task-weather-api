import { nanoid } from "nanoid";
import { useAppContext } from "../context/appContext";

export default function Days() {
  const { daily } = useAppContext();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <section>
      <h2 className="days-heading">Week</h2>
      <div className="days-intro">
        {daily.map((day) => {
          let d = new Date(day.dt * 1000);
          let dayName = days[d.getDay()];
          const { wind_speed, humidity } = day;
          const {
            temp: { day: temp },
          } = day;
          const { description, icon, main } = day.weather[0];

          return (
            <div key={nanoid()} className="days-container">
              <h4>{dayName}</h4>
              <ul className="days-container-ul">
                <img
                  src={`https://api.openweathermap.org/img/w/${icon}.png`}
                  alt="weather icon"
                />
                <li>{main}</li>
                <li>Description: {description}</li>
                <li>Wind speed: {wind_speed}m/s</li>
                <li>Humidity: {humidity}%</li>
                <li>Temperature: {Math.ceil(temp)}℃</li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
