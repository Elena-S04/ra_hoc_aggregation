export default async function getList(url) {
  const request = fetch(url, {
    method: "GET",
  });

  const result = await request;

  if (!result.ok) {
    console.error("Ошибка!");

    return;
  }

  const jsonData = await result.json();

  return jsonData;
}
