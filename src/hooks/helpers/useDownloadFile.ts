import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "../useAxiosPrivate";
import { toast } from "sonner";

export interface IDownloadData {
  endPoint: string;
  accept: string;
  fileName: string;
}

export function useDownloadFile() {
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: async function (data: IDownloadData) {
      return await axiosPrivate.get(data.endPoint, {
        headers: {
          Accept: data.accept,
        },
        responseType: "blob",
      });
    },
    onSuccess(response, variables) {
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = variables.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    onError() {
      toast.error("Download failed!");
    },
  });
}
