import HeaderAuth from '@/components/header-auth'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Separator } from '@/components/ui/separator'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={GeistSans.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <div className='texture' />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <main className='flex min-h-screen flex-col items-center'>
            <div className='flex w-full flex-1 flex-col items-center gap-20'>
              <nav className='border-b-foreground/10 flex h-16 w-full justify-center border-b'>
                <div className='flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm'>
                  <div className='flex items-center gap-5 font-semibold'>
                    <Link href='/'>Aika</Link>
                    <ThemeSwitcher />
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className='flex-auto'>{children}</div>
              <footer className='mt-16 mb-4 grid w-full gap-4'>
                <Separator />
                <div className='flex h-5 items-center justify-center space-x-4 text-xs'>
                  <p>
                    <a href='/'>Home</a>
                  </p>
                  <Separator orientation='vertical' />
                  <p>
                    <a href='/components'>Components</a>
                  </p>
                  <Separator orientation='vertical' />
                  <p>
                    <a href='https://www.keyan.dev/'>Keyan Namaghi</a>
                  </p>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
