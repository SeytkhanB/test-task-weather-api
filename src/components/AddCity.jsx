import { useState } from "react";
import { useAppContext } from "../context/appContext";

export const AddCity = () => {
  const [state, setState] = useState("");
  const { addCity } = useAppContext();

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  const addCityToContext = () => {
    addCity(state);
    setState("");
  };

  return (
    <div className="add-city">
      <input
        value={state}
        type="text"
        name="addCity"
        onChange={handleChange}
        id="add-city"
        placeholder="CITY..."
        className="add-city-input"
      />
      <button className="add-city-btn btn" onClick={addCityToContext}>
        Add city
      </button>
    </div>
  );
};
