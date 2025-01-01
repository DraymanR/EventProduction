'use client'
import Link from "next/link";
import { checkIfLoggedIn } from "../services/user/registerUser";
import useModalStore from "../store/modelStore";

const Footer = () => {
  const openModal = useModalStore((state) => state.openModal);
    
      const handleLoginClick = () => {
        if (checkIfLoggedIn()) {
          // המשתמש מחובר - נפתח את הצדדי
         alert("אתה כבר מחובר לחשבון משתמש, לאחר יציאה ניתן להתחבר שוב.")
        } else {
          // המשתמש לא מחובר - ננווט לחלון ההרשמה
          openModal();
        }
      };
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6">
          <Link href="/pages/about"  className="hover:underline">
           אודות האתר   
          </Link>
          <Link href="/pages/terms"  className="hover:underline">
           תקנון האתר
          </Link>
          <Link href="/" className="hover:underline">
            דף הבית
          </Link>
          <button onClick={handleLoginClick}  className="hover:underline">
            התחברות
          </button>
        </div>
        <p className="mt-4 text-sm">© 2024 חגיגה מושלמת. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
};

export default Footer;
