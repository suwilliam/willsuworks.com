import { useEffect, useRef } from 'react'
import type { Media } from '../content/projects'
import './ProjectMedia.css'

// One image, video or Figma prototype, with its caption. Media without a
// source shows a labelled placeholder, so empty slots are easy to spot.
export function MediaFigure({ media, onOpen }: { media: Media; onOpen?: () => void }) {
  const source = media.kind === 'figma' ? media.url : media.src

  return (
    <figure className={`media media-${media.kind}`}>
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
          onClick={onOpen}
          aria-label={`View larger: ${media.alt}`}
        >
          <img src={media.src} alt={media.alt} loading="lazy" />
        </button>
      ) : media.kind === 'video' ? (
        <video src={media.src} poster={media.poster} controls muted playsInline preload="metadata">
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
