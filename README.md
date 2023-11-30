
# lol-statistics-typescript


### 소개

라이엇 게임즈에서 제공하는 API를 활용해 리그오브레전드 플레이어의 정보를 조회 할 수 있습니다. <br/>
최근 20게임의 전적, 모스트 7, 포지션 선호도, 승률과 kda 등의 통계 정보 등을 제공 합니다.<br/>
전체적인 디자인과 구성은 [OP.GG](https://www.op.gg/)를 참고하여 제작 되었습니다.


### 버전

* ### V3 버전 ( [배포](https://lol-match-histroy.vercel.app/) | [저장소](https://github.com/YOON3N4M/lol-statistics-typescript/tree/next) )
> 배포 : vercel (11/23 첫 배포) <br><br>
> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
>
> * vercel 배포, 개발 브랜치 (next), 배포 브랜치 (main) 분리
> * 절대 경로 설정
> * Riot id 시스템 변경에 따라 검색 방식 변경 (account api 추가)
> * 최근 검색 플레이어 추가
> * 전적 검색시 보이던 여러 버그들 수정
> * 전적 갱신 제한 시간 추가
> * 시간 표시 관련
<br>

* ### V2 버전 ( [배포](https://lol-statistic.firebaseapp.com/) | [저장소](https://github.com/YOON3N4M/lol-statistics-typescript/tree/main) )
> 배포 : firebase hosting <br><br>
> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
>
> * 전체적으로 리팩토링
> * 챔피언 이름 한글화
> * RIOT API, Firebase API 각각의 함수로 분리 정리 (utils/api.ts , utils/firebaseApi)
> * 재사용률이 높은 상수들 개별 정의 (api, img url 등)  (constants/index.ts)
> * 재사용률이 높은 계산 함수, 추출 함수 개별 정의 (utils/index.ts)
<br>

* ### V1 버전 ( [배포](https://yoon3n4m.github.io/lol-statistics/) | [저장소](https://github.com/YOON3N4M/lol-statistics) )
> 배포 : github pages <br><br>
> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=javascript&logoColor=white">

<br>

### 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<hr>

### 🛠️ V3 세부 변경사항
* next.js 도입으로 전체적인 성능 개선
* next.js 자체 api 활용
* 꼬여있던 api, db 관련 코드들 전체적으로 개선
* 각종 오류 수정
* 서브 검색창 추가
* RIOT ID 시스템 적용

### 🛠️ V2 세부 변경사항
* db없이 작동하던 기존의 방식에서 API로 받아온 데이터를 db에 저장하며 활용 할 수 있게 됨
> 기존엔 앱 실행시 항상 라이엇 API 요청을 보내 매번 새로운 데이터를 받아왔지만, 현재는 db와 api 각각의 요청을 통해 필요한 데이터를 수급할 수 있음.
* 타입스크립트 적용
* styled-components 적용
* github Pages가 아닌 firebase hosting을 이용하여 SPA 앱 새로고침, 뒤로가기 등 이슈를 해결
* 기존의 잘못된 방식으로 변수를 활용하던 점들 대부분 수정/개선
* map으로 대체가능한 반복 작업 등을 map으로 코드 수정/개선
* 전체적인 코드 개선

<hr>


* 조회된 플레이어의 정보와 각 게임의 정보들은 아래와 같이 파이어베이스 db에 저장됩니다.

