import { IData } from '@/types/index';

interface MenuProps {
  content: IData;
  isLaboratory: boolean;
  switchToLaboratory: () => void;
  switchToBuilder: () => void;
}

const Menu: React.FC<MenuProps> = ({ content, isLaboratory, switchToLaboratory, switchToBuilder }) => {
  return (
    <div
      id="bottom-navbar"
      className="fixed bottom-0 z-10 flex h-[50px] w-full justify-between bg-[#678983] text-base font-bold text-white xs:text-xl"
    >
      <button className={isLaboratory ? 'w-6/12 bg-[#5c7a75]' : 'w-6/12'} onClick={() => switchToLaboratory()}>
        {content.laboratory}
      </button>
      <button className={!isLaboratory ? 'w-6/12 bg-[#5c7a75]' : 'w-6/12'} onClick={() => switchToBuilder()}>
        {content.builder}
      </button>
    </div>
  );
};

export default Menu;
