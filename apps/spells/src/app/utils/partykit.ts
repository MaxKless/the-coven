const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST ?? 'localhost:1999';
const PARTYKIT_URL = PARTYKIT_HOST.startsWith('localhost')
  ? `http://${PARTYKIT_HOST}`
  : PARTYKIT_HOST.startsWith('https')
  ? PARTYKIT_HOST
  : `https://${PARTYKIT_HOST}`;

export async function fetchPartyKitServer(path: string, init?: RequestInit) {
  const url = new URL(path, PARTYKIT_URL);
  return fetch(url, init);
}

export { PARTYKIT_HOST, PARTYKIT_URL };
