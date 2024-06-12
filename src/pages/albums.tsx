/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { average } from 'color.js'
import { sdk } from 'src/shared/instance';
import { Error, Poster, Spinner } from 'src/components';

const Albums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [err, setError] = useState('');

  useEffect(() => {
    if (!albums.length) {
      getAlbums();
    }
  }, [albums]);

  const getAlbums = async () => {
    try {
      setError('');
      const response: any = await sdk.makeRequest("GET", "me/top/tracks?limit=20&offset=0&time_range=medium_term");

      if (Array.isArray(response?.items)) {
        const mock: IAlbum[] = response?.items?.map((item: any) => ({
          title: item?.album?.name,
          artist: item?.artists[0]?.name,
          url: item?.album?.images[0]?.url,
        }))
        
        const unique_albums: IAlbum[] = [];

        mock.forEach(el => {
          if (!unique_albums.some(album => album.title === el.title && album.artist === el.artist)) {
            unique_albums.push(el);
          }
        })

        const albums = unique_albums.slice(0, 5);

        Promise
          .allSettled(albums.map(item => average(item.url, { amount: 1, format: 'hex' })))
          .then(results => {
            const all: IAlbum[] = albums.map((item, index) => {
              const res = results[index];
              if (res.status === 'fulfilled') {
                return { ...item, bg: res.value as string }
              }
              return { ...item, bg: '#8ace00' }
            })
            setAlbums(all);
          })
      }
    } catch (e: any) {
      setError(e?.message);
      console.error(e);
    }
  };

  return (
    <ul className="flex flex-col gap-4 md:gap-8">
      {(err && !albums.length) && <Error>{err}</Error>}
      {(!err && !albums.length) && <Spinner />}
      {albums.map((item, index) => (
        <li key={item.artist + item.title} className="flex items-start md:items-center gap-4 md:gap-10">
          <Poster album={item} className="flex-1" />
          <div className="flex gap-4 md:gap-10 flex-1">
            <div className="pt-2 md:pt-0 text-xl md:text-3xl">0{index + 1}</div>
            <div className="pt-2 md:pt-0 flex flex-col">
              <h2 className="font-bold text-xl md:text-3xl">{item.artist}</h2>
              <h3 className="text-lg md:text-2xl line-clamp-2 md:line-clamp-none" title={item.title}>{item.title}</h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

// const mock = [
//   {
//     url: 'https://m.media-amazon.com/images/I/71pxGj4RoVS._AC_UF894,1000_QL80_.jpg',
//     title: 'Graduation',
//     artist: 'Kanye West',
//   },
//   {
//     url: 'https://upload.wikimedia.org/wikipedia/ru/b/b7/NirvanaNevermindalbumcover.jpg',
//     title: 'Nevermind',
//     artist: 'Nirvana',
//   },
//   {
//     url: 'https://upload.wikimedia.org/wikipedia/en/0/07/PetroDragonic_Apocalypse_cover.png',
//     title: 'PetroDragonic Apocalypse; or, Dawn of Eternal Night: An Annihilation of Planet Earth and the Beginning of Merciless Damnation',
//     artist: 'King Gizzard & the Lizard Wizard',
//   },
//   {
//     url: 'https://m.media-amazon.com/images/I/71pxGj4RoVS._AC_UF894,1000_QL80_.jpg',
//     title: 'Graduation',
//     artist: 'Kanye West2',
//   },
//   {
//     url: 'https://upload.wikimedia.org/wikipedia/ru/b/b7/NirvanaNevermindalbumcover.jpg',
//     title: 'Nevermind',
//     artist: 'Nirvana2',
//   },
// ];

export default Albums;
