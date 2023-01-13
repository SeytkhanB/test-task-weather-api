import {
  GET_CITY_WEATHER,
  GET_CITY_WEATHER_DAYS,
  IS_LOADING,
  HANDLE_CHANGE,
  ADD_CITY,
  CLEAR_CITIES,
  DELETE_CITY,
  ERROR,
} from "./actions";
import { useContext, useReducer, createContext, useEffect } from "react";
import { reducer } from "./reducer";
import axios from "axios";

const initialState = {
  city: "",
  daily: [],
  currLoc: [43, 69],
  weather: [],
  cities: JSON.parse(localStorage.getItem("cities")) || ["ALMATY"],
  isLoading: false,
  error: false,
};

let baseUrl = "https://api.openweathermap.org/data";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { cities, city } = state;

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities, city]);

  const getCityWeatherDays = async ({ lat, lon }) => {
    try {
      const url = `${baseUrl}/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=a60c40a7c7afebf26ec14e9116b4d21a&units=metric`;
      const { data } = await axios.get(url);
      dispatch({ type: GET_CITY_WEATHER_DAYS, payload: data.daily });
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };

  const getCityWeather = async () => {
    if (!city) city = "ALMATY";
    const url = `${baseUrl}/2.5/forecast?q=${city}&appid=a60c40a7c7afebf26ec14e9116b4d21a&units=metric&cnt=5`;
    dispatch({ type: IS_LOADING });
    try {
      const { data } = await axios.get(url);
      dispatch({ type: GET_CITY_WEATHER, payload: data });
      getCityWeatherDays(data.city.coord);
    } catch (error) {
      dispatch({ type: ERROR });
    }
  };

  const handleChangeContext = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const addCity = (city) => {
    if (!city) {
      return;
    }
    const capCity = city.toUpperCase();
    dispatch({ type: ADD_CITY, payload: capCity });
  };

  const clearCities = () => {
    dispatch({ type: CLEAR_CITIES });
  };

  const deleteCity = (city) => {
    dispatch({ type: DELETE_CITY, payload: city });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getCityWeather,
        handleChangeContext,
        addCity,
        clearCities,
        deleteCity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
