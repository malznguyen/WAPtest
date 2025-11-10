const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function sendMessage(message: string, city = 'Hanoi') {
  const res = await fetch(`${API}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, city })
  });
  const data = await res.json();
  return data.message;
}

export async function getAlert(city = 'Hanoi') {
  const res = await fetch(`${API}/api/ai/alert?city=${city}`);
  const data = await res.json();
  return data.alert;
}
