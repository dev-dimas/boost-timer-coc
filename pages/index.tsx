import { Quicksand } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import Footer from '@/components/Footer';
import FormBuilder from '@/components/FormBuilder';
import FormLaboratory from '@/components/FormLaboratory';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { data } from '@/contents/data';
import builderHutImage from '@/public/images/builder-hut.png';
import laboratoryImage from '@/public/images/laboratory.png';
import { IData } from '@/types/index';
import { getLanguagePreferences } from '@/utils/preferences';

const quicksand = Quicksand({ subsets: ['latin'] });

export default function Home() {
  const [isLaboratory, setIsLaboratory] = useState<boolean>(true);
  const [isEnglish, setIsEnglish] = useState<boolean | null>(null);
  const [contentLanguage, setContentLanguage] = useState<IData | null>(null);

  useEffect(() => {
    const getCurrentLanguage = async () => {
      setIsEnglish(await getLanguagePreferences());
    };
    getCurrentLanguage();
  }, []);

  useEffect(() => {
    if (isEnglish === true) {
      setContentLanguage(data.en);
    } else if (isEnglish === false) {
      setContentLanguage(data.id);
    }
  }, [isEnglish]);

  const switchLanguage = (): void => {
    setIsEnglish(!isEnglish);
    localStorage.setItem('isEnglish', String(!isEnglish));
  };

  const switchToLaboratory = (): void => {
    setIsLaboratory(true);
  };

  const switchToBuilder = (): void => {
    setIsLaboratory(false);
  };

  if (isEnglish === null || contentLanguage === null) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Boost Timer Clash of Clans</title>
        <meta name="description" content="Tools to count boost timer in Clash of Clans" />
        <meta name="theme-color" content="#121B28" />
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar isEnglish={isEnglish} switchLanguage={switchLanguage} className={quicksand.className} />
      <main className={`${quicksand.className}`}>
        <Container>
          <div className="my-3 flex flex-col items-center justify-center rounded-md bg-white sm:text-base">
            <h1 className="text-[4vw] font-bold sm:text-2xl">
              {isLaboratory ? contentLanguage.headerLaboratoryBooster : contentLanguage.headerBuilderBooster}
            </h1>
            <Image
              src={isLaboratory ? laboratoryImage : builderHutImage}
              alt={isLaboratory ? 'Laboratory Image' : 'Builder Hut Image'}
              height={200}
              priority
            />
            {isLaboratory ? <FormLaboratory content={contentLanguage} /> : <FormBuilder content={contentLanguage} />}
          </div>
        </Container>
        <Menu content={contentLanguage} isLaboratory={isLaboratory} switchToBuilder={switchToBuilder} switchToLaboratory={switchToLaboratory} />
      </main>
      <Footer />
    </>
  );
}
