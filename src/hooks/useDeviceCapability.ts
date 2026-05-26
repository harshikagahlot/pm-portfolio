export function useDeviceCapability() {
  const isLowEnd =
    typeof navigator !== 'undefined' &&
    (navigator.hardwareConcurrency <= 4 ||
      (/Android|webOS|iPhone|iPad/i.test(navigator.userAgent) && window.devicePixelRatio < 2))

  return { shouldRender3D: !isLowEnd }
}
