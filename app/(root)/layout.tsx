import LeftsideBar from '@/components/shared/leftsideBar/LeftsideBar';
import Navbar from '@/components/shared/navbar/Navbar';
import RightsideBar from '@/components/shared/rightsideBar/RightsideBar';
import { Toaster } from '@/components/ui/toaster';
import React, { Suspense } from 'react';
import Loading from './loading';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100">
      <Suspense fallback={<Loading />}>
        <Navbar />
        <div className="flex">
          <LeftsideBar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </section>
          <RightsideBar />
        </div>
        <Toaster />
      </Suspense>
    </main>
  );
};

export default Layout;
