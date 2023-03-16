# 본 저장소는
IE인지 아닌지를 확인하는 자바스크립트 함수입니다.

`navigator.userAgent`, `document.documentMode 속성`, `window.ActiveXObject 객체 사용 여부`로 교차검증합니다.

# 사용법
if (is_ie()) {
  //IE를 사용할 경우
} else {
  //IE를 사용하지 않을 경우
}

# 기타
IE는 지원종료 되었습니다. 보안에 매우 취약합니다. 사용을 적극 비권장합니다.

# 라이선스
MIT 라이선스로 배포됩니다.