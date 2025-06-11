import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { useGetLocationList } from "@/hooks";

type Props = {
  onSelect: (value: number) => void;
};

export default function LocationSelection({ onSelect }: Props) {
  const getLocationList = useGetLocationList();
  const locations = getLocationList.data?.data.data;
  const locationOptions = locations?.map((location) => ({
    value: location.id.toString(),
    label: location.name,
  }));

  return (
    <div className="space-y-1">
      <Label htmlFor="locationId">Location</Label>
      <Combobox
        options={locationOptions || []}
        selectMessage="Select location..."
        onSelect={(value) => onSelect(+value)}
        modal={true}
      />
    </div>
  );
}
