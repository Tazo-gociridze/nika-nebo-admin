import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getTours } from '../../api/get-tours';
import { TourData } from '../../types/Tour/index.types';
import { GET_TOURS_QUERY_KEY } from './enum';

interface ToursResponse {
    Tours: TourData[];
}

const useGetToursQuery = (): UseQueryResult<ToursResponse, Error> => {
  return useQuery({
    queryKey: [GET_TOURS_QUERY_KEY.TOURS],
    queryFn: async () => {
      const data = await getTours();
        return {
        Tours: data?.map((tour: TourData) => ({
          ...tour,
            image_url: tour.image_url,
            created_at: new Date(tour.created_at),
        })) || [],
      };
    },
  });
};

export default useGetToursQuery;