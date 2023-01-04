import { PropsWithChildren } from 'react';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Topbar /> */}
      {/* {Sidebar />} */}
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
