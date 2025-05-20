import { useAxiosPrivate } from "@/hooks";
import { ISuccessResponse } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export interface IGetMyProfileResponse {
  name: string;
  email: string;
  imageUrl: string | null;
}

export function useGetMyProfile() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: async function () {
      return await axiosPrivate.get<ISuccessResponse<IGetMyProfileResponse>>(
        "/api/v1/profile/me"
      );
    },
  });
}
