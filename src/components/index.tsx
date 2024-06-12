import React from "react"

export const Spinner = () => (
  <div className="text-8xl animate-spin text-center w-fit mx-auto">⟳</div>
)

export const Error: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-red-800/50 px-4 py-6 rounded-xl mb-20 text-lg">{children}</div>
)

const checkLuma = (color: string) => {
  const c = color.substring(1);      // strip #
  const rgb = parseInt(c, 16);   // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;  // extract red
  const g = (rgb >>  8) & 0xff;  // extract green
  const b = (rgb >>  0) & 0xff;  // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 40;
}

export const Poster: React.FC<{ album: IAlbum, className: string }> = ({ album, className }) => (
  <div
    className={`poster ${className}`}
    style={{ background: album.bg, color: checkLuma(album.bg) ? 'white' : 'black' }}
  >
    <span>{album.title}</span>
  </div>
)