import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
import * as types from '../constants/actionTypes';
import * as options from '../constants/fetchOptions';
import { getText } from '../utils/utils';
import { getUserFromFB } from '../../../common/auth';
// import { checkStatus, createPOST, parseJSON } from '../utils/fetch';

export const failedRequest = error => (
  {
    type: types.ERR_FAILED_REQUEST,
    data: error,
  }
);

// Sets state.user
export const saveUserToStore = userData => (
  {
    type: types.SAVE_USER_TO_STORE,
    data: userData,
  }
);

// export const getUserFromDB = fbUser => {
//   const payload = JSON.stringify(fbUser);

//   return dispatch => {
//     fetch('/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//         'Content-length': payload.length,
//       },
//       credentials: 'same-origin',
//       body: payload,
//     })
//     .then(res => res.json())
//     .then(res => dispatch(saveUserToStore(res)))
//     .catch(err => dispatch(failedRequest(err)));
//   };
// };

export const login = () => (
  dispatch => (
    window.FB.login(res => {
      if (res.status === 'connected') {
        getUserFromFB().then(user => dispatch(getUserFromDB(user)));
      }
    }, { scope: 'public_profile,email' })
  )
);

export const logout = () => (
  dispatch => (
    window.FB.logout(() => (
      dispatch(saveUserToStore({
        id: null,
      }))
    ))
  )
);


// TODO: delete, functionality moved to ext
// adder actions
// export const setAdder = adder => {
//   const sel = window.getSelection();
//   const range = sel.getRangeAt(0);
//   const distance = Math.abs(
//     range.endOffset - range.startOffset
//   );

//   // console.log('range: ', range);
//   let display = adder;

//   if (distance > 0) {
//     if (adder !== 'SHOW') {
//       display = 'SHOW';
//     }
//   } else {
//     if (adder !== 'HIDE') {
//       display = 'HIDE';
//     }
//   }

//   return {
//     type: 'SET_ADDER',
//     display,
//   };
// };

// widget actions
// export const setWidget = (display) => ({
//   type: types.SET_WIDGET,
//   display,
// });

// Updates state.annotations.body.text to given value
export const updateBody = (text) => ({
  type: types.UPDATE_BODY,
  text,
});

// export const setTarget = (target) => ({
//   type: types.SET_TARGET,
//   selector: target,
// });

// Resets state.annotation to default / empty values
export const clearAnnote = () => ({
  type: types.CLEAR_ANNOTATION,
});

// Sets the value for state.annotation
export const setAnnote = annote => ({
  type: types.SET_ANNOTATION,
  annote,
});

// Adds Annotation(s) to state.annotations
export const addAnnote = annote => ({
  type: types.ADD_ANNOTATION,
  annote,
});

// export const saveAnnote = annote => (
//   dispatch => {
//     // create full annotation object
//     // const annotation = createAnnote(data);
//     console.log('annotation: ', annote);
//     // annote.createdAt = Date.now();

//     fetch(
//       options.API_CREATE,
//       createPOST(annote)
//     )
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(annotation => {
//       // TODO: remove locateAnnote, will occur in ext.
//       // locateAnnote(document.body, annotation);
//       dispatch(addAnnote(annotation));
//       dispatch(clearAnnote());
//     });
//     return annote;
//   }
// );

// fetch annotations for a specific
// user and URL
// export const getAnnotes = (user) => {
//   const url = window.location.href;
// };

// export const adderHandler = (
//   btn,
//   data
// ) => (
//   dispatch => {
//     const selector = getText();
//     if (btn === 'note') {
//       dispatch(setTarget(selector));
//       dispatch(setWidget('SHOW'));
//     } else if (btn === 'highlight') {
//       const { annotation } = data;
//       annotation.target = selector;

//       dispatch(setTarget(selector));
//       dispatch(saveAnnote({
//         annotation,
//         annotations: data.annotations,
//         user: data.user,
//       }));
//     }
//     return selector;
//   }
// );
