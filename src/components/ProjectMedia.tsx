import { useEffect, useRef, type CSSProperties } from 'react'
import type { Media } from '../content/projects'
import './ProjectMedia.css'

// One image, video or Figma prototype, with its caption. Media without a
// source shows a labelled placeholder, so empty slots are easy to spot.
export function MediaFigure({
  media,
  onOpen,
}: {
  media: Media
  /** Opens the full-size viewer on the image with this src. */
  onOpen?: (src: string) => void
}) {
  if (media.kind === 'gallery') {
    return (
      <figure className="media media-gallery">
        <div
          className={`media-gallery-grid${media.columns === 1 ? ' is-stacked' : ''}${media.rowHeight ? ' is-row' : ''}`}
          style={
            {
              '--count': media.columns ?? Math.min(media.images.length, 3),
              '--row-height': media.rowHeight ? `${media.rowHeight}px` : undefined,
            } as CSSProperties
          }
        >
          {media.images.map((image) => (
            <button
              key={image.src}
              type="button"
              className="media-zoom"
              onClick={() => onOpen?.(image.src)}
              aria-label={`View larger: ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>
        {media.caption && <figcaption>{media.caption}</figcaption>}
      </figure>
    )
  }

  const source = media.kind === 'figma' ? media.url : media.src
  // A video can ask to be shown smaller and centred, e.g. a phone recording.
  const maxWidth = media.kind === 'video' ? media.maxWidth : undefined

  return (
    <figure
      className={`media media-${media.kind}`}
      style={maxWidth ? { width: '100%', maxWidth, marginInline: 'auto' } : undefined}
    >
      {!source ? (
        <div className="media-placeholder">
          <span className="media-placeholder-kind">
            {media.kind === 'video'
              ? 'Video'
              : media.kind === 'figma'
                ? 'Figma prototype'
                : 'Image'}
          </span>
          {media.alt}
        </div>
      ) : media.kind === 'image' ? (
        <button
          type="button"
          className="media-zoom"
          onClick={() => onOpen?.(media.src)}
          aria-label={`View larger: ${media.alt}`}
        >
          <img src={media.src} alt={media.alt} loading="lazy" />
        </button>
      ) : media.kind === 'video' ? (
        <video
          src={media.src}
          poster={media.poster}
          controls
          muted
          playsInline
          autoPlay={media.autoplay}
          loop={media.autoplay}
          preload={media.autoplay ? 'auto' : 'metadata'}
          aria-label={media.alt}
        >
          {media.alt}
        </video>
      ) : (
        <iframe
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(media.url)}`}
          title={media.alt}
          loading="lazy"
          allowFullScreen
        />
      )}
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  )
}

export type LightboxImage = { src: string; alt: string; caption?: string }

// Full-size view of a project's images. Arrow keys flip between them;
// Escape or clicking outside the image closes it.
export function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: {
  images: LightboxImage[]
  index: number | null
  onChange: (index: number) => void
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const open = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const image = open ? images[index] : undefined
  const step = (by: number) => {
    if (index === null) return
    onChange((index + by + images.length) % images.length)
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Image viewer"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1)
        if (event.key === 'ArrowLeft') step(-1)
      }}
    >
      {image && (
        <figure>
          <img src={image.src} alt={image.alt} />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      )}
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-step lightbox-prev"
            onClick={() => step(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-step lightbox-next"
            onClick={() => step(1)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </dialog>
  )
}
