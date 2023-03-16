function is_ie() {
  // 방법 1: navigator.userAgent를 사용하여 브라우저 식별
  var userAgent = window.navigator.userAgent;
  var msie = userAgent.indexOf("MSIE ");
  var trident = userAgent.indexOf("Trident/");

  if (msie > 0 || trident > 0) {
    return true;
  }

  // 방법 2: document.documentMode 속성을 사용하여 브라우저 식별
  if ('documentMode' in document) {
    return true;
  }

  // 방법 3: window.ActiveXObject 객체 사용 여부로 브라우저 식별
  if (window.ActiveXObject !== undefined) {
    return true;
  }

  return false;
}