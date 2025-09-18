import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";

export default function Location() {
  return (
    <div className="space-y-3 p-4">
      <h1 className="font-semibold items-center text-md">Location List</h1>
      <LocationForm mode="create" />
      <LocationList />
    </div>
  );
}
