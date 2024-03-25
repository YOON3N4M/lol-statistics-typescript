# lol-statistics-typescript
라이엇 게임즈에서 제공하는 API를 활용해 리그오브레전드 플레이어의 정보를 조회 할 수 있습니다. <br/>
최근 20게임의 전적, 모스트 7, 포지션 선호도, 승률과 kda 등의 통계 정보 등을 제공 합니다.<br/>
전체적인 디자인과 구성은 [OP.GG](https://www.op.gg/)를 참고하여 제작 되었습니다.<br/>

javascript로 만들었던 [기존 프로젝트](https://github.com/YOON3N4M/lol-statistics/) 를 typescirpt로 마이그레이션 후 <br/>
여러 기술 도입, 기능 추가, 디자인 수정, 반응형, 코드 리팩토링 등을 통해 지속적인 업데이트를 진행중에 있습니다. <br/>


<br/>

## Stacks
<strong>Front</strong> : Next.js, typescript, zustand, chakra ui(emotion) <br/>
<strong>DB</strong> : firebase

<br/>

## Update
#### 24.03 
* styled-compoent -> emotion 변경후 일부 기능 제외 반응형 구현
* zustand 도입
* pages / containers 폴더 구조 변경
* 코드 리팩토링 / 개선 중 ...

<br/>

## Prev version
### 🛠️ V3 기능 변경사항
* 각종 오류 수정
* 서브 검색창 추가
* RIOT ID 시스템 적용
* 전적 갱신 제한 시간 추가
* 최근 검색 플레이어 추가
* 챔피언 아이콘 클릭시 해당 챔피언의 opgg 가이드 페이지로 이동
* 전적 조회 시 각 게임 별 자세히 보기 기능 추가
* 시간 표시 관련
* 전적 검색시 보이던 여러 버그들 수정


### 🛠️ V2 기능 변경사항
* db없이 작동하던 기존의 방식에서 API로 받아온 데이터를 db에 저장하며 활용 할 수 있게 됨
> 기존엔 앱 실행시 항상 라이엇 API 요청을 보내 매번 새로운 데이터를 받아왔지만, 현재는 db와 api 각각의 요청을 통해 필요한 데이터를 수급할 수 있음.

* 기존의 잘못된 방식으로 변수를 활용하던 점들 대부분 수정/개선
* map으로 대체가능한 반복 작업 등을 map으로 코드 수정/개선
* 전체적인 코드 개선 
* 챔피언 이름 한글화


