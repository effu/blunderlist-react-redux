/* api/groups/index.js */
import 'whatwg-fetch';
// import uuidV1 from 'uuid';
import receiveStatus from '../receiveStatus';

const DOMAIN = 'http://localhost:3001';

export default class groupsApi {
  static createGroupPromise(group) {
    return fetch(`${DOMAIN}/groups`, {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    })
      .then(res => receiveStatus(res))
        .then(res => res.json())
      .catch(err => receiveStatus(err));
  }

  static deleteGroupPromise(group) {
    return fetch(`${DOMAIN}/groups/${group.id}`, {
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

  static updateGroupPromise(group) {
    return fetch(`${DOMAIN}/groups/${group.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    })
      .then(res => receiveStatus(res))
        .then(res => res.json())
      .catch(err => receiveStatus(err));
  }
}
