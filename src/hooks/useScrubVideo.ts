import { useEffect, type RefObject } from 'react'

const SENSITIVITY = 0.8
const INITIAL_PROGRESS = 0.4
const MIN_FRAME_DELTA = 1 / 30
const EASE = 0.42

export function useScrubVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video || typeof window === 'undefined') return

    let previousX: number | null = null
    let targetTime = 0
    let queuedTime: number | null = null
    let seekInFlight = false
    let animationFrame: number | null = null
    let initialized = false
    let isIntersecting = true

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)')
    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const clamp = (value: number, duration: number) =>
      Math.min(duration, Math.max(0, value))

    const getDuration = () =>
      Number.isFinite(video.duration) && video.duration > 0
        ? video.duration
        : null

    const getFrameDelta = (duration: number) =>
      Math.max(MIN_FRAME_DELTA, duration / 120)

    const canSeek = () =>
      isIntersecting && document.visibilityState === 'visible'

    const canScrub = () =>
      canSeek() &&
      !reducedMotionQuery.matches &&
      !coarsePointerQuery.matches &&
      !mobileQuery.matches

    const cancelScheduledSeek = () => {
      if (animationFrame === null) return
      window.cancelAnimationFrame(animationFrame)
      animationFrame = null
    }

    const flushSeek = () => {
      animationFrame = null
      if (seekInFlight || !canSeek()) return

      const duration = getDuration()
      if (duration === null || video.readyState < HTMLMediaElement.HAVE_METADATA) {
        return
      }

      const target = clamp(targetTime, duration)
      const current = video.currentTime
      const remaining = target - current
      const frameDelta = getFrameDelta(duration)

      if (Math.abs(remaining) < frameDelta) {
        queuedTime = null
        return
      }

      const next = clamp(current + remaining * EASE, duration)
      const seekTo = Math.abs(target - next) < frameDelta ? target : next

      queuedTime = Math.abs(target - seekTo) < frameDelta ? null : target
      seekInFlight = true
      video.currentTime = seekTo
    }

    const scheduleSeek = () => {
      if (animationFrame !== null || !canSeek()) return
      animationFrame = window.requestAnimationFrame(flushSeek)
    }

    const queueTarget = (force = false) => {
      const duration = getDuration()
      if (duration === null) return

      const next = clamp(targetTime, duration)
      const frameDelta = getFrameDelta(duration)
      const comparisonTime = queuedTime ?? video.currentTime

      if (!force && Math.abs(comparisonTime - next) < frameDelta) return

      queuedTime = next
      scheduleSeek()
    }

    const resetPointer = () => {
      previousX = null
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!canScrub()) return

      const duration = getDuration()
      if (duration === null) return

      if (previousX === null) {
        previousX = event.clientX
        return
      }

      const delta = event.clientX - previousX
      previousX = event.clientX
      targetTime = clamp(
        targetTime +
          (delta / Math.max(window.innerWidth, 1)) * SENSITIVITY * duration,
        duration,
      )
      queueTarget()
    }

    const onSeeked = () => {
      seekInFlight = false
      if (queuedTime !== null) scheduleSeek()
    }

    const onLoaded = () => {
      if (initialized) return

      const duration = getDuration()
      if (duration === null) return

      initialized = true
      targetTime =
        video.currentTime < MIN_FRAME_DELTA
          ? duration * INITIAL_PROGRESS
          : video.currentTime
      queueTarget(true)
    }

    const onVisibilityChange = () => {
      if (!canSeek()) {
        resetPointer()
        video.pause()
        cancelScheduledSeek()
        return
      }

      scheduleSeek()
    }

    const onMediaPreferenceChange = () => {
      resetPointer()
      if (!canScrub()) video.pause()
      if (canSeek()) scheduleSeek()
    }

    const observationTarget = (() => {
      const sibling = video.nextElementSibling
      if (sibling?.matches('section')) return sibling

      // ScrubVideo is rendered before <main>; Hero is main's first section.
      return sibling?.querySelector('section') ?? null
    })()

    const observer =
      observationTarget && 'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            isIntersecting = entry.isIntersecting
            onVisibilityChange()
          }, { threshold: [0, 0.35] })
        : null

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('loadeddata', onLoaded)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', resetPointer)
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotionQuery.addEventListener('change', onMediaPreferenceChange)
    coarsePointerQuery.addEventListener('change', onMediaPreferenceChange)
    mobileQuery.addEventListener('change', onMediaPreferenceChange)
    if (observationTarget) observer?.observe(observationTarget)

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onLoaded()

    return () => {
      cancelScheduledSeek()
      observer?.disconnect()
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('loadeddata', onLoaded)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', resetPointer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotionQuery.removeEventListener('change', onMediaPreferenceChange)
      coarsePointerQuery.removeEventListener('change', onMediaPreferenceChange)
      mobileQuery.removeEventListener('change', onMediaPreferenceChange)
    }
  }, [videoRef])
}
