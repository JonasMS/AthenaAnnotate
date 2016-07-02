export const initFB = () => (
  new Promise(resolve => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.6',
      });
      return resolve();
    };

    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  })
);

export const getUserStatusFromFB = () => (
  new Promise(resolve => {
    window.FB.getLoginStatus(res => (
      res ? resolve(res.status) : resolve(res)
    ));
  })
);

export const getUserFromFB = () => (
  new Promise(resolve => {
    window.FB.api(
      '/me?fields=id,email,name,picture.type(large)',
      res => resolve(res),
      { scope: 'email' }
    );
  })
);
