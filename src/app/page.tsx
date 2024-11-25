import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">!ברוכים הבאים ל-חגיגה מושלמת</h1>
      <p className="mb-6">התחילו לתכנן את האירוע שלכם עם ספקי שירות מעולים.</p>
      <div className="flex space-x-4">
        {/* <Link href="src/app/login.tsx">
          <a className="px-4 py-2 bg-blue-600 text-white rounded">התחברות</a>
        </Link>
        <Link href="/register">
          <a className="px-4 py-2 bg-green-600 text-white rounded">הרשמה</a>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;
