import { useRef } from 'react'
import { useScrubVideo } from '../hooks/useScrubVideo'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'

export function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useScrubVideo(videoRef)

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  )
}
