import { nanoid } from "nanoid";
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

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_CITY_WEATHER: {
      const data = action.payload;
      return {
        ...state,
        weather: [{ ...data, id: nanoid(), city: data.city.name }],
      };
    }

    case GET_CITY_WEATHER_DAYS: {
      const daily = action.payload;
      daily.pop();
      return {
        ...state,
        daily,
        isLoading: false,
      };
    }

    case HANDLE_CHANGE: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }

    case ADD_CITY: {
      const city = action.payload;
      if (state.city === "") {
        return { ...state, cities: [...state.cities, city], city };
      }
      return { ...state, cities: [...state.cities, city] };
    }

    case CLEAR_CITIES: {
      return { ...state, cities: [], city: "" };
    }

    case DELETE_CITY: {
      const toDeleteCity = action.payload;
      const newCities = state.cities.filter((city) => city !== toDeleteCity);
      return { ...state, cities: newCities };
    }

    case IS_LOADING: {
      return { ...state, isLoading: true, error: false };
    }

    case ERROR: {
      return { ...state, isLoading: false, error: true };
    }

    default:
      return { state };
  }
};
