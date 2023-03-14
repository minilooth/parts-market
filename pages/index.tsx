import {NextPage} from "next";

import {CommonLayout} from "components/layout/CommonLayout";
import {MainContainer} from "components/layout/MainContainer";
import {withAuthSSP} from "core/withAuthSSP";
import {ADMIN, USER} from "core/consts/authorities";

const HomePage: NextPage = () => {
  return (
    <CommonLayout title='Home'>
      <MainContainer>
        HOME PAGE
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = withAuthSSP(async () => {
  return {
    props: {}
  }
}, {
  authorizationNeeded: true,
  canAccessAuthorized: true,
  authorities: [ADMIN, USER]
})

export default HomePage;
