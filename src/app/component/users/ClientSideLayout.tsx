'use client';  // זה מציין שזו קומפוננטת צד לקוח

import useNavbarStore from '@/app/store/navbarStore'; // גישה ל-store
import ConsumerSidebar from '@/app/component/users/userSidebar'; // תפריט צד
import "@/app/globals.css";

const ClientSideLayout = () => {
    const { isOpen } = useNavbarStore(); // גישה ל-store

    return (
        <div>
            {isOpen &&
                <aside className='fixed right-0 top-[105px] h-[calc(100vh-155px)] w-64 shadow-lg z-40 flex flex-col bg-[#C68FE6] '>
                    <ConsumerSidebar />
                </aside>
            }
        </div>
    );
}
export default ClientSideLayout