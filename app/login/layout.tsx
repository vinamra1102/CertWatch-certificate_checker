import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - CertWatch',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19]">
      {children}
    </div>
  );
}
