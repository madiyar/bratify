import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export const sdk = SpotifyApi.withUserAuthorization(import.meta.env.VITE_SPOTIFY_CLIENT_ID, window.location.origin, ["user-top-read"]);
