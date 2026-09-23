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
  }, [location.pathname, location.hash])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

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
          scrolled || open || location.pathname !== '/' ? 'border-b border-black/10 bg-white/95 backdrop-blur-md' : ''
        }`}
      >
        <nav aria-label="Main navigation" className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <Link
            to="/"
            className="text-[21px] tracking-tight text-black sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Zyntara AI
          </Link>

          <div className="hidden grid-cols-5 divide-x divide-black/15 border border-black/15 text-center text-[14px] text-black lg:grid">
            {NAV_LINKS.map((link) => (
              <span key={link.to} className="min-w-[88px] xl:min-w-[106px]">
                <Link
                  to={link.to}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                  className={`block px-3 py-2.5 transition-colors hover:bg-black/5 ${
                    location.pathname === link.to ? 'bg-black/5 underline decoration-[#ef6c35] decoration-2 underline-offset-4' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden border border-black/25 px-5 py-2.5 text-[14px] text-black transition-colors hover:bg-black hover:text-white lg:inline"
          >
            Book a consultation
          </Link>

          <button
            type="button"
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
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
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
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
