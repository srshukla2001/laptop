import './globals.css'

export const metadata = {
  title: '3D Website with Three.js',
  description: 'Interactive 3D website using React Three Fiber',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}