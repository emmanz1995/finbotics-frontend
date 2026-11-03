import { useEffect, useState } from 'react';
import { authService } from '@/app/services/auth';

export const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<{
    username: string;
    userId: string;
  } | null>(null);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const accessToken = JSON.parse(
          localStorage.getItem('access_token') as string
        ).access_token;
        const userDetails = authService.extractCurrentUser(accessToken);

        setCurrentUser(userDetails);
      } catch (err: any) {
        console.log(err);
      }
    };

    void getCurrentUser();
  }, []);

  return { currentUser };
};
