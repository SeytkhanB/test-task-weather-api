import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

export default function DropDownCities() {
  const { getCityWeather, handleChangeContext, city, cities, clearCities } =
    useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleChangeContext({ name, value });
  };

  const handleSubmit = () => {
    getCityWeather();
  };

  useEffect(() => {
    getCityWeather();
  }, []);

  return (
    <div className="drop-down">
      <select
        value={city}
        placeholder="CITY.."
        name="city"
        onChange={handleChange}
        className="drop-down-select"
      >
        {cities?.map((city) => (
          <option key={nanoid()} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button className="drop-down-btn btn" onClick={handleSubmit}>
        Submit
      </button>
      <button className="drop-down-btn btn" onClick={clearCities}>
        Clear
      </button>
    </div>
  );
}
