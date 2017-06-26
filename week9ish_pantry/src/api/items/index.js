import 'whatwg-fetch';
import receiveStatus from '../receiveStatus';

export default class itemsApi {
  static createItemPromise(item) {
    return fetch('/items', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => receiveStatus(res))
        .then(res => res.json())
      .catch(err => receiveStatus(err));
  }
}
