'use client';  // זה מציין שזו קומפוננטת צד לקוח

import useNavbarStore from '@/app/store/navbarStore'; // גישה ל-store
import ConsumerSidebar from '@/app/component/users/userSidebar'; // תפריט צד
import "@/app/globals.css";

const ClientSideLayout = () => {
    const { isOpen } = useNavbarStore(); // גישה ל-store

    return (
        <div>
            {isOpen &&
                <aside className="fixed top-[120px] right-0 w-64 h-[calc(100vh-120px)] bg-gray-800 shadow-lg border-l border-gray-700 overflow-y-auto">
                    <ConsumerSidebar />
                </aside>
            }
        </div>
    );
}
export default ClientSideLayout