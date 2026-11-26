// 2026 homepage: whether the "Dokos en deux minutes" video is open over the
// page, and which links open it. Links whose `to` is PRESENTATION become
// buttons when the video exists and are dropped when it does not.
export const PRESENTATION = '#presentation'

export const usePresentation = () => useState('h26-presentation-open', () => false)

// Set by the page from the content: true once the video file exists.
export const usePresentationReady = () => useState('h26-presentation-ready', () => false)
