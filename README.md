### 🚧수정이 진행중인 프로젝트 입니다🚧
> 
> 수정중에 있습니다. 
> 
> 4/1 1차적인 수정 완료. 미지원 기능 알람, 현재 랭크 표시 등 일부 기능 수정 예정
>
> 10/23 전체 리팩토링 진행중... 


<br>
<br>


# lol-statistics-typescript

현재 버전 배포 : https://lol-statistic.firebaseapp.com/
> (react, typescript, firebase, styled-components 적용)
<br>

기존 버전 배포 : https://yoon3n4m.github.io/lol-statistics/ & 저장소 :https://github.com/YOON3N4M/lol-statistics 
> (react, javascript, redux)

<br>

### 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<hr>

### 🛠️해당 버전에서 개선된 점
* db없이 작동하던 기존의 방식에서 API로 받아온 데이터를 db에 저장하며 활용 할 수 있게 됨
> 기존엔 앱 실행시 항상 라이엇 API 요청을 보내 매번 새로운 데이터를 받아왔지만, 현재는 db에서 데이터를 조회한 후 존재하지 않을시 라이엇 API 요청을 하게 됨.
> 이후 사용자 스스로 최신 데이터가 필요해지면 "전적 갱신" 버튼을 통해 라이엇 API 요청 과정을 통해 전적을 갱신 할 수 있게 됨.
* 타입스크립트 적용
* styled-components 적용
* github Pages가 아닌 firebase hosting을 이용하여 SPA 앱 새로고침, 뒤로가기 등 이슈를 해결
* 기존의 잘못된 방식으로 변수를 활용하던 점들 대부분 수정/개선
* map으로 대체가능한 반복 작업 등을 map으로 코드 수정/개선
* 기존의 방식보다 전적 출력의 속도가 빨라짐
* 전체적인 코드 개선

<hr>

### 앱소개

* 라이엇 게임즈에서 제공하는 API를 활용해 리그오브레전드 플레이어의 최근 게임 전적을 조회할 수 있습니다.
* 조회된 플레이어의 정보와 각 게임의 정보들은 아래와 같이 파이어베이스 db에 저장됩니다.
> Key는 플레이어 고유의 puuid
> ![image](https://user-images.githubusercontent.com/115640584/228858451-b13a8ac1-d14f-43aa-9d67-02fcda78674f.png)
> key는 각 게임의 고유 ID
> ![image](https://user-images.githubusercontent.com/115640584/228858610-4d412657-58ab-41af-8e6e-61a110f0ae18.png)


