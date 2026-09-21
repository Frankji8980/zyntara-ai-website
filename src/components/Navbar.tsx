import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../lib/content'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full px-5 py-4 transition duration-300 sm:px-8 sm:py-5 ${
          scrolled ? 'border-b border-black/10 bg-white/90 backdrop-blur-md' : ''
        }`}
      >
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="text-[21px] tracking-tight text-black sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Zyntara AI
          </Link>

          <div className="hidden text-[23px] text-black lg:flex">
            {NAV_LINKS.map((link, index) => (
              <span key={link.to}>
                {index > 0 ? <span>, </span> : null}
                <Link
                  to={link.to}
                  className={`transition-opacity hover:opacity-60 ${
                    location.pathname === link.to ? 'underline underline-offset-4' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity lg:inline"
          >
            Book a consultation
          </Link>

          <button
            type="button"
            className="flex flex-col gap-[5px] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={`block h-[2px] w-6 bg-black transition duration-300 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-black transition duration-300 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-black transition duration-300 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className="fixed inset-0 z-40 flex flex-col justify-center gap-8 bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-[32px] font-medium text-black"
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="text-[32px] font-medium text-black underline underline-offset-2"
        >
          Book a consultation
        </Link>
      </div>
    </>
  )
}
