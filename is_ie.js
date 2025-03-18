/**
 * 브라우저가 Internet Explorer(IE)인지 판별하는 함수
 *
 * 이 함수는 IE를 감지하기 위해 다양한 브라우저 고유 속성과 메서드를 활용합니다.
 * 특히, 단순히 유저 에이전트 문자열만 검사하면 크롬 등 다른 브라우저가 IE로 위장할 경우
 * 잘못 감지될 수 있으므로, IE에만 존재하는 여러 특징을 함께 검사합니다.
 *
 * [추가된 방법]
 * - 다른 브라우저 전용 속성 확인: Chrome, Firefox, Opera 등 고유 속성이 있으면 IE가 아님
 * - 최신 브라우저의 navigator.userAgentData 존재 여부: IE에서는 지원하지 않음
 * - document.uniqueID 속성: IE 고유의 속성
 * - window.showModalDialog 함수: 이전 버전 IE에서 사용되는 모달 대화상자 함수
 * - CSS 접두사 속성: IE에서만 지원하는 MS 접두사 CSS 속성
 * - window.MSInputMethodContext 속성: IE 11 등에서 사용되는 입력 관련 속성
 *
 * @returns {boolean} IE인 경우 true, 그렇지 않으면 false
 */
function is_ie() {
  // [추가 방법 A] 다른 브라우저 전용 속성 확인
  // Chrome: window.chrome와 chrome.webstore가 존재하면 IE가 아님
  // Firefox: InstallTrigger가 정의되어 있으면 IE가 아님
  // Opera: window.opr와 opr.addons가 있으면 IE가 아님
  if ((window.chrome && window.chrome.webstore) ||
      (typeof InstallTrigger !== 'undefined') ||
      (window.opr && window.opr.addons)) {
    return false;
  }

  // [추가 방법 B] 최신 브라우저의 navigator.userAgentData 검사
  // 최신 브라우저는 userAgentData API를 지원하지만, IE는 지원하지 않으므로
  // 해당 API가 존재하면 IE가 아님을 알 수 있습니다.
  if (navigator.userAgentData) {
    return false;
  }

  // [방법 1] navigator.userAgent 검사
  // IE 10 이하: "MSIE " 문자열, IE 11: "Trident/" 문자열 포함
  const ua = window.navigator.userAgent;
  if (ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1) {
    return true;
  }

  // [방법 2] document.documentMode 속성 검사
  // IE에서만 정의되어 있는 속성으로, 렌더링 모드를 나타냅니다.
  if (typeof document.documentMode !== "undefined") {
    return true;
  }

  // [방법 3] window.ActiveXObject 존재 여부 검사
  // 구형 IE에서는 ActiveXObject가 정의되어 있거나, window 객체에 프로퍼티로 존재합니다.
  if (typeof window.ActiveXObject !== "undefined" || "ActiveXObject" in window) {
    return true;
  }

  // [방법 4] navigator.msSaveOrOpenBlob 메서드 검사
  // IE 10 이상에서 지원하는 메서드입니다.
  if (typeof window.navigator.msSaveOrOpenBlob === "function") {
    return true;
  }

  // [방법 5] window.attachEvent 메서드 검사
  // IE 8 이하에서는 addEventListener 대신 attachEvent를 사용합니다.
  if (typeof window.attachEvent !== "undefined" && !window.addEventListener) {
    return true;
  }

  // [방법 6] document.all 객체 검사
  // IE 고유 객체인 document.all이 정의되어 있으며, 다른 브라우저의 경우 window.chrome 등
  // IE가 아닌 고유 속성이 없을 때만 IE로 간주합니다.
  if (document.all && !window.chrome) {
    return true;
  }

  // [방법 7] window.execScript 함수 검사
  // IE에서만 존재하는 스크립트 실행 함수입니다.
  if (typeof window.execScript !== "undefined") {
    return true;
  }

  // [방법 8] 조건부 주석(Conditional Comments) 사용
  // IE 9 이하에서 지원되던 조건부 주석 기능을 이용하여 IE를 감지합니다.
  let isIEConditional = false;
  /*@cc_on
    isIEConditional = true;
  @*/
  if (isIEConditional) {
    return true;
  }

  // [방법 9] document.uniqueID 속성 검사
  // IE에서만 존재하는 고유 ID 속성이 정의되어 있다면 IE일 가능성이 높습니다.
  if (typeof document.uniqueID !== "undefined") {
    return true;
  }

  // [방법 10] window.showModalDialog 함수 검사
  // 이전 버전의 IE에서 지원되던 모달 대화상자 함수입니다.
  if (typeof window.showModalDialog === "function") {
    return true;
  }

  // [방법 11] CSS 접두사 속성 검사
  // IE에서는 특정 MS 접두사 CSS 속성(예: msTextCombineHorizontal)을 지원합니다.
  if (window.getComputedStyle) {
    const computedStyle = window.getComputedStyle(document.documentElement, null);
    if (computedStyle && typeof computedStyle.msTextCombineHorizontal !== "undefined") {
      return true;
    }
  }

  // [방법 12] window.MSInputMethodContext 속성 검사
  // IE 11 및 일부 IE에서 사용되는 입력 관련 속성입니다.
  if (typeof window.MSInputMethodContext !== "undefined") {
    return true;
  }

  // 위의 모든 조건에 해당하지 않으면 IE가 아님
  return false;
}
