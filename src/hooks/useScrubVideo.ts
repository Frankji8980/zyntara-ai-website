import { useEffect, type RefObject } from 'react'

const SENSITIVITY = 0.8

export function useScrubVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let prevX: number | null = null
    let targetTime = 0
    let seeking = false

    const clamp = (value: number, duration: number) =>
      Math.min(duration, Math.max(0, value))

    const seekToTarget = () => {
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      const next = clamp(targetTime, duration)
      if (Math.abs(video.currentTime - next) < 0.0005) {
        seeking = false
        return
      }
      seeking = true
      video.currentTime = next
    }

    const onSeeked = () => {
      seeking = false
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      if (Math.abs(clamp(targetTime, duration) - video.currentTime) > 0.0005) {
        seekToTarget()
      }
    }

    const onMouseMove = (event: MouseEvent) => {
      const currentX = event.clientX
      if (prevX === null) {
        prevX = currentX
        return
      }

      const delta = currentX - prevX
      prevX = currentX

      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return

      targetTime = clamp(
        targetTime + (delta / window.innerWidth) * SENSITIVITY * duration,
        duration,
      )

      if (!seeking) seekToTarget()
    }

    const onLoaded = () => {
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      if (video.currentTime < 0.05) {
        targetTime = duration * 0.4
        seekToTarget()
      } else {
        targetTime = video.currentTime
      }
    }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('loadeddata', onLoaded)
    window.addEventListener('mousemove', onMouseMove)

    if (video.readyState >= 1) onLoaded()

    return () => {
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('loadeddata', onLoaded)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [videoRef])
}
