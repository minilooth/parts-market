import {NextPage} from 'next';

import {MainContainer} from '@components/layout/MainContainer';
import {CommonLayout} from '@components/layout/CommonLayout';
import {Settings} from '@components/settings/content/Settings';
import {SettingsMenuItems, SettingsMenuWidth} from '@core/consts/settings';
import {withAuthSSP} from '@core/withAuthSSP';
import {Admin} from '@core/consts/authorities';
import {Api} from '@core/api';
import {BodyTypesSWRKey, EngineTypesSWRKey, MakesSWRKey, TransmissionTypesSWRKey} from '@core/consts/swr';

const SettingsPage: NextPage = () => {
  return (
    <CommonLayout title='Settings'>
      <MainContainer>
        <Settings menuWidth={SettingsMenuWidth} items={SettingsMenuItems}/>
      </MainContainer>
    </CommonLayout>
  )
}

export const getServerSideProps = withAuthSSP(async (ctx) => {
  const makes = await Api(ctx).make.getAll();
  const bodyTypes = await Api(ctx).bodyType.getAll();
  const transmissionTypes = await Api(ctx).transmissionType.getAll();
  const engineTypes = await Api(ctx).engineType.getAll();
  
  return {
    props: {},
    fallback: {
      [MakesSWRKey]: makes,
      [BodyTypesSWRKey]: bodyTypes,
      [TransmissionTypesSWRKey]: transmissionTypes,
      [EngineTypesSWRKey]: engineTypes
    }
  }
}, {
  authorizationNeeded: true,
  canAccessAuthorized: true,
  authorities: [Admin]
})

export default SettingsPage;