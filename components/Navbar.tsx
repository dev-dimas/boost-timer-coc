import Link from 'next/link';

interface NavbarProps {
  isEnglish: boolean;
  switchLanguage: () => void;
  className: string;
}

const Navbar: React.FC<NavbarProps> = ({ isEnglish, switchLanguage, className }) => {
  return (
    <header className={`flex items-center justify-around bg-primary py-2 ${className}`}>
      <div className="flex items-center">
        <Link href="/" className="text-[6vw] font-bold text-white xs:py-5 xs:text-xl">
          Boost Timer COC
        </Link>
      </div>
      <div id="menu" className="flex items-center">
        <button
          className="rounded-md border px-2 text-[6vw] font-bold text-white hover:bg-white hover:text-black xs:text-xl"
          onClick={switchLanguage}
        >
          {isEnglish === true ? 'ID' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
