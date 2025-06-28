import Button from './components/Button';
import React, { type ForwardedRef, type RefObject, forwardRef } from 'react';
import { type OutletCompProps, withOutlet } from './hoc/withOutlet';
import { makePlugOf } from './hoc/makePlugOf';
import { joinClassNames } from './utils/joinClassNames';

const profileCardContainer = 'p-6 rounded-xl bg-white shadow flex flex-col items-center gap-4';
const profileCardName = 'text-lg font-bold text-gray-90';
const profileCardAge = 'text-gray-60 text-center';
const profileCardActions = 'flex gap-2 mt-2';

const outletNames = ['name', 'age', 'actions'] as const;

const ProfileCardOutletRoot = forwardRef(
  (props: OutletCompProps<typeof outletNames>, forwardedRef: ForwardedRef<HTMLElement>) => {
    const { outlets, className } = props;
    const cardRef = forwardedRef as RefObject<HTMLDivElement>;
    return (
      <section className={joinClassNames(className, profileCardContainer)} ref={cardRef}>
        {outlets.name}
        {outlets.age}
        <div className={profileCardActions}>{outlets.actions}</div>
      </section>
    );
  }
);
ProfileCardOutletRoot.displayName = 'ProfileCard.Outlet';

const ProfileCardOutlet = withOutlet(outletNames, ProfileCardOutletRoot);

export const ProfileCard = Object.assign(ProfileCardOutlet, {
  Name: makePlugOf('name', profileCardName),
  Age: makePlugOf('age', profileCardAge),
  Actions: makePlugOf('actions', profileCardActions),
});

const App = () => {
  return (
    <main className="p-8">
      <ProfileCard>
        <ProfileCard.Name>
          <p>김나연</p>
        </ProfileCard.Name>
        <ProfileCard.Age>
          <p>26세</p>
        </ProfileCard.Age>
        <ProfileCard.Actions>
          <React.Fragment key="actions">
            <Button variant="info">팔로우</Button>
            <Button variant="success" asChild>
              <a href="https://www.naver.com">네이버 링크</a>
            </Button>
          </React.Fragment>
        </ProfileCard.Actions>
      </ProfileCard>
    </main>
  );
};

export default App;
