import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <>
      <main className="flex h-full w-full flex-col items-center justify-center">
        <h1>{t('title')}</h1>
        <LanguageSwitcher />
      </main>
    </>
  );
}
