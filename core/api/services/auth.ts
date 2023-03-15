import {AxiosInstance} from 'axios';

import {User} from '@core/types';
import {Admin} from '@core/consts/authorities';

export const AuthApi = (instance: AxiosInstance) => ({

  async isLoggedIn(): Promise<boolean> {
    return true;
    // const { data: isLoggedIn } = await instance.get<boolean>('/auth/is-logged-in');
    // return isLoggedIn;
  },

  async me(): Promise<User> {
    return {
      id: 1,
      createdAt: '2023-03-13T11:58:33.497Z' as unknown as Date,
      updatedAt: '2023-03-13T11:58:33.497Z' as unknown as Date,
      username: 'qwerty',
      firstName: 'Matvei',
      surname: 'Moroz',
      patronymic: 'Dmitrievich',
      authorities: [
        {name: Admin}
      ],
      avatar: '1.jpg'
    }
    // const { data: user} = await instance.get<User>("/auth/me");
    // return user;
  }

})