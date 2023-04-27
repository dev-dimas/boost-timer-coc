import { IData } from '@/types/index';

interface ResultProps {
  result: number;
  boostDuration: number;
  boostDurationLeft: number;
  content: IData;
}

const Result: React.FC<ResultProps> = ({ result, boostDuration, boostDurationLeft, content }) => {
  return (
    <>
      {boostDuration !== boostDurationLeft && (
        <div id="result" className="mt-5 flex flex-col items-center justify-center border-t pt-5 text-[4vw] sm:text-xl">
          <p className="text-center">
            {content.resultBoostDurationPt1}
            {boostDuration}
            {content.resultBoostDurationPt2}
          </p>
          <div className="flex flex-col items-center justify-center text-[3.5vw] font-bold sm:text-base">
            {Math.trunc(result / 60 / 24) !== 0 && (
              <p>
                {Math.trunc(result / 60 / 24)} {content.day}
              </p>
            )}
            {Math.trunc((result / 60) % 24) !== 0 && (
              <p>
                {Math.trunc((result / 60) % 24)}
                {` ${content.hours}`}
              </p>
            )}
            {result % 60 !== 0 && (
              <p>
                {result % 60}
                {` ${content.minutes}`}
              </p>
            )}
            {boostDurationLeft !== 0 && (
              <p className="text-center">
                {content.resultBoostDurationLeftPt1} {boostDurationLeft}
                {` ${content.minutes}`}
                {content.resultBoostDurationLeftPt2}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Result;
