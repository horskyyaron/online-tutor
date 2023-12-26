export async function saveSession(session: { challenge_id: number; code: string }) {
  const response = await fetch("/api/saveSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(session),
  });
  const result = await response.json();
  return result;
}
