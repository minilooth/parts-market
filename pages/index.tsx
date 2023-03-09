import {NextPage} from "next";

import {CommonLayout} from "components/layout/CommonLayout";
import {MainContainer} from "components/layout/MainContainer";

const HomePage: NextPage = () => {
  return (
    <CommonLayout title='Home'>
      <MainContainer>
        HOME PAGE
      </MainContainer>
    </CommonLayout>
  )
}

export default HomePage;
