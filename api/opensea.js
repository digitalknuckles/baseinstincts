export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Missing address" });
    }

    const CONTRACT = "0x40941ee94980e0fc623311b31c20fbae56673d81";

    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/base/account/${address}/nfts`,
      {
        headers: {
          "X-API-KEY": process.env.OPENSEA_API
        }
      }
    );

    const data = await response.json();

    // DEBUG LOG (check Vercel logs if needed)
    console.log("OS RAW:", data);

    const nfts = (data.nfts || [])
      .filter(n => n.contract?.toLowerCase() === CONTRACT.toLowerCase())
      .map(n => ({
        image: n.display_image_url || n.image_url,
        name: n.name
      }))
      .filter(n => n.image);

   // return res.status(200).json({ nfts });
    return {
  image: image_url,
  name: name,
  attributes: metadata.attributes // 🔥 REQUIRED
}

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message
    });
  }
}
