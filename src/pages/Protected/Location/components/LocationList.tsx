import { useGetLocationList } from "@/hooks";
import LocationListItem from "./LocationListItem";

export default function LocationList() {
  const getLocationList = useGetLocationList();
  const locations = getLocationList.data?.data.data;

  return locations?.map((location) => (
    <LocationListItem key={location.id} id={location.id} name={location.name} />
  ));
}
