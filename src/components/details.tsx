import { Detail } from "@/lib/types";
import { axiosInstance } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function Details() {
  const {data: details, error, isPending, isError } = useQuery({
    queryKey: ["details"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/details/");
      console.log(response);
      return response.data as Detail;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching details, {error.message}</div>;
  }

  return (
    <div>
      <p>
        <strong>Details:</strong>
        <br />
        <br />
        {details.income}
        <br />
        {details.grade}
        <br />
        {details.employee_length}
        <br />
        {details.home_ownership}
      </p>
    </div>
  )
}
