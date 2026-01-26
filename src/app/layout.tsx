import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '化妆品知识大测试 - 看看你的男朋友能对几题',
  description: '趣味化妆品知识测试，测测你对化妆品的了解程度',
  keywords: '化妆品,测试,知识,趣味',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
