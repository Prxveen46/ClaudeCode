import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Praveen Kumar | Senior Data Analyst',
  description: 'Senior Data Analyst with 9+ years — AI-Augmented Analytics, BI, SQL, Snowflake, Tableau, Power BI, Python. Delivered for Microsoft, Amazon, Nike & Audi.',
  keywords: ['Data Analyst', 'Marketing Analytics', 'Business Intelligence', 'SQL', 'Tableau', 'Power BI', 'Snowflake', 'Python', 'Claude Code'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#090C09', color: '#EDF8E8' }}>{children}</body>
    </html>
  )
}
