import DropDownCities from "../components/DropDownCities";
import Weather from "../components/Weather";
import { AddCity } from "../components/AddCity";
import ListOfCities from "../components/ListOfCities";

export const Main = () => {
  return (
    <main className="main">
      <DropDownCities />
      <AddCity />
      <ListOfCities />
      <Weather />
    </main>
  );
};
