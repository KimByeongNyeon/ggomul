import axios from 'axios';

export const baekjoonClientProvider = {
  provide: 'BAEKJOON_CLIENT',
  useFactory: () => {
    return axios.create({
      baseURL: 'https://solved.ac/api/v3',
      headers: {
        Accept: 'application/json',
      },
    });
  },
};
