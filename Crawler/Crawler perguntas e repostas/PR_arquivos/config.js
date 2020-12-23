var OneSignal = window.OneSignal || []; // eslint-disable-line no-var

var oneSignalIds = { // eslint-disable-line no-var
  development: '76ea79dc-c189-4938-b761-28bc6d8eeada',
  hlg: '6b03b942-4a6f-47b1-b68a-009cb3467972',
  production: 'fcf55186-4b78-4d35-85b1-c6478916f206'
};

const hasCookies = Boolean(window.localStorage.getItem('all_enabled'));

function initOnesignal() {
  OneSignal.push(function() {
      OneSignal.init({
        appId: oneSignalIds[window.__gzhenv__] || oneSignalIds.hlg,
      });
  });
}

// Verifying if cookie notice is already accepted to then show one signal notification
if (hasCookies) {
  initOnesignal();
} else {
  var intervalCookieNoticeCount = 0;
  var intervalCookieNotice = setInterval(() => {
    const hasCookies = Boolean(window.localStorage.getItem("all_enabled"));
    
    // check while 1:30m if cookie notice was accepted to then show one signal notification
    // if time ended show notification anyway
    if (hasCookies || intervalCookieNoticeCount >= 5) {
      initOnesignal();
      clearInterval(intervalCookieNotice);
    } else {
      intervalCookieNoticeCount++;
    }
  }, 15000);
}


