const baseUrl = 'https://esamarathon.dev/api/news';

export async function LoadAnnouncements(limit: string | undefined) {
  const response = await fetch(`${baseUrl}?limit=${limit}`);
  return response.json();
}
