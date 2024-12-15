
import ConsumerSidebar from '@/app/component/users/userSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

<<<<<<< HEAD
=======

>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
  return (
    <div>
      <ConsumerSidebar></ConsumerSidebar>
      {children}
    </div>
  );
}
