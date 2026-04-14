export default async function handler(req, res) {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Missing address" });
    }

    const CONTRACT = "0x40941ee94980e0fc623311b31c20fbae56673d81".toLowerCase();

    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/base/account/${address}/nfts`,
      {
        headers: {
          "X-API-KEY": process.env.OPENSEA_API
        }
      }
    );

    const data = await response.json();

    console.log("OS RAW:", data);

    const nfts = (data.nfts || [])
      .filter(n => {
        // 🔥 VERY IMPORTANT: handle contract correctly
        const addr =
          n.contract ||
          n.contract_address ||
          n.collection?.contract_address;

        return addr?.toLowerCase() === CONTRACT;
      })
      .map(n => {
        const metadata = n.metadata || {};

        return {
          image: n.display_image_url || n.image_url,
          name: n.name || metadata.name,

          // ✅ THIS IS THE KEY FIX
          attributes:
            n.traits ||
            metadata.attributes ||
            []
        };
      })
      .filter(n => n.image);

    console.log("FILTERED NFTs:", nfts.length);

    return res.status(200).json({ nfts });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      details: err.message
    });
  }
}
