import { Link } from 'react-router-dom'
import { EMAIL, SLOGAN } from '../lib/content'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-white px-5 py-8 text-[13px] text-black/70 sm:px-8 md:px-10 sm:text-[15px]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>{SLOGAN}</p>
        <p>
          Zyntara AI · Australia ·{' '}
          <a className="underline underline-offset-2" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
      </div>
      <p className="mt-4">
        <Link to="/contact" className="underline underline-offset-2">
          Get in touch
        </Link>
      </p>
    </footer>
  )
}
