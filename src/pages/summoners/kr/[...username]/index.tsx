import React, { useEffect, useState } from "react";
import ContainerSummoners from "@/containers/sumonners/ContainerSummoners";

// export async function getServerSideProps() {
// 	const res = await firebaseAPI.getUserDocument('멀록몰록말록물록')
// 	return { props: { res } }
// }

function Summoners() {
  return (
    <>
      <ContainerSummoners />
    </>
    // <>
    //   <Header />
    //   <Box>
    //     {!status && (
    //       <StyledErrorContainer>
    //         <h3>KR 지역 내 검색결과가 없습니다.</h3>
    //         <p>변경된 RIOT ID 시스템에 따라 재시도 해주세요.</p>
    //         <div className="body">
    //           <div>
    //             <h4>기존 닉네임 검색</h4>
    //             <span className="name">Hide on bush#KR1</span>
    //             <span>태그 생략가능</span>
    //           </div>
    //           <div>
    //             <h4>RIOT ID 검색</h4>
    //             <span className="name">허거덩#0303</span>
    //             <span>태그까지 필수 입력</span>
    //           </div>
    //         </div>
    //       </StyledErrorContainer>
    //     )}
    //     {userDocument ? (
    //       <>
    //         <SummonerHead
    //           userDocument={userDocument}
    //           selectedContents={selectedContents}
    //           setSelectedContents={setSelectedContents}
    //           refresh={refresh}
    //           loadingPercent={loadingPercent}
    //         />
    //         {loadingPercent === 100 ? (
    //           <SummonerBody
    //             userDocument={userDocument}
    //             matchInfoArr={matchInfoArr}
    //           />
    //         ) : (
    //           <LoadingSpinner />
    //         )}
    //       </>
    //     ) : (
    //       <>{status && <LoadingSpinner />}</>
    //     )}
    //   </Box>
    // </>
  );
}

export default Summoners;
