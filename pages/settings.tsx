import {NextPage} from 'next';

import {MainContainer} from '@components/layout/MainContainer';
import {CommonLayout} from '@components/layout/CommonLayout';
import {Settings} from '@components/settings/content/Settings';
import {SettingsMenuItems, SettingsMenuWidth} from '@core/consts/settings';
import {withAuthSSP} from '@core/withAuthSSP';
import {Admin} from '@core/consts/authorities';

const SettingsPage: NextPage = () => {
  return (
    <CommonLayout title='Settings'>
      <MainContainer>
        <Settings menuWidth={SettingsMenuWidth} items={SettingsMenuItems}/>
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
  authorities: [Admin]
})

export default SettingsPage;