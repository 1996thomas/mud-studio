import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import PageLoader from '@/app/components/PageLoader'

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mud-studio.fr'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'MUD Studio',
    template: '%s | MUD Studio',
  },
  description:
    'Lieu de création artistique à Montreuil : expositions, ateliers, résidences, événements et collaborations culturelles.',
  keywords: [
    'MUD Studio',
    'Montreuil',
    'lieu culturel',
    'atelier artiste',
    'espace créatif',
    'résidence artistique',
    'exposition',
    'workshop',
    'tiers lieu',
    'art contemporain',
  ],

  authors: [{ name: 'MUD Studio', url: BASE_URL }],
  creator: 'MUD Studio',
  publisher: 'MUD Studio',

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'MUD Studio',
    title: 'MUD Studio',
    description:
      'Lieu de création artistique à Montreuil : expositions, ateliers, résidences, événements et collaborations culturelles.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'MUD Studio — espace de création à Montreuil',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@mudstudio',
    title: 'MUD Studio',
    description:
      'Lieu de création artistique à Montreuil : expositions, ateliers, résidences, événements et collaborations culturelles.',
    images: ['/opengraph-image'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
}

// viewport-fit=cover: contenu sous l'encoche iPhone, safe-area-inset-* gère les marges
export const viewport: Viewport = {
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <PageLoader />
        {children}
      </body>
    </html>
  )
}
