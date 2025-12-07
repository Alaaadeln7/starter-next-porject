'use client';

import { NextIntlClientProvider } from 'next-intl';

import { ErrorMessageProvider } from '@/hooks/useErrorMessage';

import ReactQueryProvider from './ReactQueryProvider';

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Array<object>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        <ErrorMessageProvider>{children}</ErrorMessageProvider>
      </ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
