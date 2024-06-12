/* eslint-disable @typescript-eslint/no-explicit-any */
import { average } from "color.js";
import { useState } from "react"
import { Error, Poster } from "src/components";
import { sdk } from "src/shared/instance";

const defaultAlbum: IAlbum = {
  url: '',
  title: 'BRAT',
  artist: 'Charli xcx',
  bg: '#8ace00'
}

const Search = () => {
  const [input, setInput] = useState('');
  const [err, setError] = useState('');
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [album, setAlbum] = useState<IAlbum>(defaultAlbum);

  const handleSearch = async () => {
    try {
      setError('');
      const { albums } = await sdk.search(input, ["album"]);

      if (Array.isArray(albums.items)) {

        const mock: IAlbum[] = albums.items.map((item: any) => ({
          title: item.name,
          artist: item?.artists[0]?.name,
          url: item.images[0].url,
          bg: ''
        }))
        
        const unique_albums: IAlbum[] = [];

        mock.forEach(el => {
          if (!unique_albums.some(album => album.title === el.title && album.artist === el.artist)) {
            unique_albums.push(el);
          }
        })

        setAlbums(unique_albums);
      }

    } catch (e: any) {
      setError(e?.message);
      console.error(e);
    }
  };

  const selectAlbum = (album: IAlbum) => {
    average(album.url, { amount: 1, format: 'hex' })
      .then(bg => {
        setAlbum({...album, bg: bg as string })
      })
      .catch(() => {
        setAlbum({...album, bg: defaultAlbum.bg})
      })
  }

  return (
    <div>
      <Poster album={album} className="mx-auto max-w-48" />
      <h2 className="text-3xl font-bold text-center pt-3 pb-1">{album.artist}</h2>
      <h3 className="text-2xl text-center">{album.title}</h3>

      {err && <Error>{err}</Error>}

      <div className="flex items-stretch justify-center mt-6 mx-4">
        <input
          value={input}
          placeholder="BRAT"
          onChange={e => setInput(e.target.value)}
          className="px-6 py-4 w-full rounded-l-2xl bg-neutral-700"
        />
        <button onClick={handleSearch} className="bg-primary rounded-r-2xl px-3 text-black font-bold">Search</button>
      </div>

      {albums.length > 0 && (
        <ul className="h-52 overflow-y-auto border mx-4 rounded-lg mt-4 border-white/25">
          {albums.map(el => (
            <li
              key={el.artist + el.title}
              className={`cursor-pointer px-6 py-6 border-b border-b-white/5 ${el.artist + el.title === album.artist + album.title ? 'bg-neutral-800' : ''}`}
              onClick={() => selectAlbum(el)}
            >
              <span className="font-bold">{el.title}</span><span className="text-neutral-400"> by {el.artist}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Search