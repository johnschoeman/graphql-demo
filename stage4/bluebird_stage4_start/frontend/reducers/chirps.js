import { RECEIVE_CHIRPS, RECEIVE_SINGLE_CHIRP } from '../actions/chirps';

function deepFreeze(obj) {
  
    // Retrieve the property names defined on obj
    var propNames = Object.getOwnPropertyNames(obj);
  
    // Freeze properties before freezing self
    propNames.forEach(function(name) {
      var prop = obj[name];
  
      // Freeze prop if it is an object
      if (typeof prop == 'object' && prop !== null)
        deepFreeze(prop);
    });
  
    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
  }

let initialState = {
  byId: {},
  allIds: []
};

export default (state = initialState, action) => {
  deepFreeze(state);
  switch (action.type) {
    case RECEIVE_CHIRPS:
      const chirps = {
        byId: {},
        allIds: []
      };
      action.chirps.forEach(chirp => {
        chirps.byId[chirp.id] = chirp;
        chirps.allIds.push(chirp.id)
      });
      return chirps;
    case RECEIVE_SINGLE_CHIRP:
      let newState = JSON.parse(JSON.stringify(state));
      if (!newState.byId[action.chirp.id]) {
        newState.allIds.unshift(action.chirp.id);
      }
      newState.byId[action.chirp.id] = action.chirp;
      return newState;
    default:
      return state;
  }
}
