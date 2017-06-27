/* api/items/index.js */
import 'whatwg-fetch';
// import uuidV1 from 'uuid';
import receiveStatus from '../receiveStatus';

const DOMAIN = 'http://localhost:3001';

export default class itemsApi {
  static createItemPromise(item) {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       id: uuidV1(),
    //       groupId: item.groupId,
    //       name: item.name,
    //       completed: false,
    //     });
    //   }, 100);
    // });
    return fetch(`${DOMAIN}/items`, {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(res => receiveStatus(res))
        .then(res => res.json())
      .catch(err => receiveStatus(err));
  }

  static deleteItemPromise(item) {
    // return new Promise((resolve) => {
    //   console.log(item);
    //   setTimeout(() => {
    //     resolve();
    //   }, 100);
    // });
    return fetch(`${DOMAIN}/items/${item.id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => receiveStatus(res))
        .then(res => res.json())
      .catch(err => receiveStatus(err));
  }

  static updateItemPromise(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: item.id,
          groupId: item.groupId,
          name: item.name,
          completed: item.completed,
        });
      }, 100);
    });
    // return fetch('/items', {
    //   method: 'POST',
    //   credentials: 'same-origin',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(item),
    // })
    //   .then(res => receiveStatus(res))
    //     .then(res => res.json())
    //   .catch(err => receiveStatus(err));
  }
}
