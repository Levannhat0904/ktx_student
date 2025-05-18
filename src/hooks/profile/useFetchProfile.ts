import { useCurrentSession } from "@/api/auth";
import { useStudent } from "@/contexts/StudentContext";

const useFetchProfile = () => {
  const { isPending, error, data, refetch } = useCurrentSession();
  const { studentData, isLoading: studentLoading } = useStudent();

  return {
    loading: isPending || studentLoading,
    error,
    data: data?.data,
    studentData,
    refetch,
  };
};

export default useFetchProfile;
