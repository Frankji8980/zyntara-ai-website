import { useRef } from 'react'
import { useScrubVideo } from '../hooks/useScrubVideo'

export function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useScrubVideo(videoRef)

  return (
    <video
      ref={videoRef}
      src="/hero.mp4"
      poster="/hero-poster.jpg"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center', backgroundColor: '#d8d6d2' }}
    />
  )
}
