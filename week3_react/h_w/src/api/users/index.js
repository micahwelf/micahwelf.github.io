import 'whatwg-fetch';
import uuidV1 from 'uuid';
//import receiveStatus from '../receiveStatus';

export default class usersApi {
  static loginUserPromise(user) {
    return new Promise((resolve) => {
		 setTimeout(() => {
			 resolve({
             id: uuidV1(),
             username: user.username,
             password: user.password,
          });
		 }, 100);
	 });
    
  }
}
