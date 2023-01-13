import { useAppContext } from "../context/appContext";

export default function ListOfCities() {
  const { cities, deleteCity } = useAppContext();

  return (
    <section className="list-of-cities">
      <h4 className="list-of-cities-heading">List of cities:</h4>
      {cities.map((city) => {
        return (
          <div key={city} className="list-of-cities-container">
            {city}
            <button
              className="list-of-cities-btn btn"
              onClick={() => deleteCity(city)}
            >
              X
            </button>
          </div>
        );
      })}
    </section>
  );
}
