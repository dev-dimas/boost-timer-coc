import { ChangeEvent, useState } from 'react';

import { IData } from '@/types/index';

import Result from './Result';

interface FormLaboratoryProps {
  content: IData;
}

const FormLaboratory: React.FC<FormLaboratoryProps> = ({ content }) => {
  const [boostDuration, setBoostDuration] = useState<number>(60);
  const [boostDurationLeft, setBoostDurationLeft] = useState<number>(0);
  const [inputDays, setInputDays] = useState<number>(0);
  const [inputHours, setInputHours] = useState<number>(0);
  const [inputMinutes, setInputMinutes] = useState<number>(0);
  const [resultMinutes, setResultMinutes] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const changeBoostDuration = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setBoostDuration(0);
    } else {
      setBoostDuration(parseInt(e.target.value));
    }
  };
  const changeInputDays = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setInputDays(0);
    } else {
      setInputDays(parseInt(e.target.value));
    }
  };
  const changeInputHours = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setInputHours(0);
    } else {
      setInputHours(parseInt(e.target.value));
    }
  };
  const changeInputMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setInputMinutes(0);
    } else {
      setInputMinutes(parseInt(e.target.value));
    }
  };

  const calculateResult = () => {
    setBoostDurationLeft(0);
    let spendMinutes = 0;
    let totalHours = inputDays * 24 + inputHours;
    let totalMinutes = totalHours * 60 + inputMinutes;
    let totalBoostCapability = boostDuration * 24;
    if (totalMinutes > totalBoostCapability) {
      spendMinutes = totalMinutes - totalBoostCapability + boostDuration;
      setResultMinutes(spendMinutes);
    } else {
      spendMinutes = boostDuration - (totalBoostCapability - totalMinutes) / 24;
      setResultMinutes(spendMinutes);
      setBoostDurationLeft((totalBoostCapability - totalMinutes) / 24);
    }
    setShowResult(true);
  };

  return (
    <>
      <form className="mt-4 w-full">
        <div className="input-group flex flex-col items-center justify-center">
          <label className="text-center text-[3.5vw] font-bold sm:text-xl">{content.boostDurationLeft}</label>
          <div className="flex w-full justify-center rounded-md shadow-sm">
            <input
              type="number"
              className="block w-full rounded-xl rounded-r-none border border-r-0 border-black px-2 py-2 md:w-[50%]"
              placeholder="Input boost duration left"
              value={boostDuration}
              onChange={changeBoostDuration}
              onFocus={(e) => e.target.select()}
            />
            <span className="inline-flex w-[100px] min-w-fit items-center justify-center rounded-xl rounded-l-none border border-black bg-[#ebebeb] px-1 text-[3.5vw] font-bold sm:px-2 sm:text-base">
              {content.minutes}
            </span>
          </div>
        </div>

        <div className="input-group mt-3 flex flex-col">
          <label className="text-center text-[3.5vw] font-bold sm:text-xl">{content.researchTime}</label>
          <div className="flex w-full justify-center rounded-md shadow-sm">
            <input
              type="number"
              className="block w-full rounded-xl rounded-r-none border border-r-0 border-black px-2 py-2 md:w-[50%]"
              placeholder="Input the research time in day"
              value={inputDays}
              onChange={changeInputDays}
              onFocus={(e) => e.target.select()}
            />
            <span className="inline-flex w-[100px] min-w-fit items-center justify-center rounded-xl rounded-l-none border border-black bg-[#ebebeb] px-1 text-[3.5vw] font-bold sm:px-2 sm:text-base">
              {content.day}
            </span>
          </div>
          <div className="mt-3 flex w-full justify-center rounded-md shadow-sm">
            <input
              type="number"
              className="block w-full rounded-xl rounded-r-none border border-r-0 border-black px-2 py-2 md:w-[50%]"
              placeholder="Input the research time in hours"
              value={inputHours}
              onChange={changeInputHours}
              onFocus={(e) => e.target.select()}
            />
            <span className="inline-flex w-[100px] min-w-fit items-center justify-center rounded-xl rounded-l-none border border-black bg-[#ebebeb] px-1 text-center text-[3.5vw] font-bold sm:px-2 sm:text-base">
              {content.hours}
            </span>
          </div>
          <div className="mt-3 flex w-full justify-center rounded-md shadow-sm">
            <input
              type="number"
              className="block w-full rounded-xl rounded-r-none border border-r-0 border-black px-2 py-2 md:w-[50%]"
              placeholder="Input the research time in minutes"
              value={inputMinutes}
              onChange={changeInputMinutes}
              onFocus={(e) => e.target.select()}
            />
            <span className="inline-flex w-[100px] min-w-fit items-center justify-center rounded-xl rounded-l-none border border-black bg-[#ebebeb] px-1 text-[3.5vw] font-bold sm:px-2 sm:text-base">
              {content.minutes}
            </span>
          </div>
        </div>
      </form>
      <button
        className="my-4 w-full rounded-xl bg-black p-3 text-[3.5vw] font-bold text-white sm:text-xl md:w-[calc(50%+100px)]"
        onClick={calculateResult}
      >
        {content.calculate}
      </button>
      {showResult && <Result result={resultMinutes} boostDuration={boostDuration} boostDurationLeft={boostDurationLeft} content={content} />}
    </>
  );
};

export default FormLaboratory;
