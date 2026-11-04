export default async function handler(req: any, res: any) {
  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=USD");
    if (!response.ok) {
      throw new Error(`Frankfurter API returned ${response.status}`);
    }
    const data = await response.json();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
}
