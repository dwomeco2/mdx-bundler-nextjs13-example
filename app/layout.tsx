import './globals.css'

import Link from 'next/link'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-center">
          <div className="flex mx-auto w-3/5 mt-32">
            <nav className="flex-0 basis-24">
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </nav>
            <main className="flex-1 basis-0 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
