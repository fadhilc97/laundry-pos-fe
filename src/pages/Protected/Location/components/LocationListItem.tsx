import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IGetLocationResponse } from "@/hooks";
import { Pencil } from "lucide-react";
import { useState } from "react";
import LocationForm from "./LocationForm";

type Props = IGetLocationResponse;

export default function LocationListItem({ id, name }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <Card className="rounded-lg px-4 py-2">
      {isEdit ? (
        <LocationForm
          mode="edit"
          initialValues={{ name }}
          locationId={id}
          onCancel={() => setIsEdit(false)}
          onEditSuccess={() => setIsEdit(false)}
        />
      ) : (
        <div className="flex justify-between items-center">
          <p>{name}</p>
          <Button type="button" size="sm" onClick={() => setIsEdit(true)}>
            <Pencil size={14} />
          </Button>
        </div>
      )}
    </Card>
  );
}
