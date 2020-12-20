const baseUrl = 'https://esamarathon.dev/api/news';

export async function loadAnnouncements(limit?: string) {
  const response = await fetch(`${baseUrl}${limit ? `?limit=${limit}` : ''}`);
  return response.json();
}
