export default async function handler(req, res) {
  const { address } = req.query;

  const r = await fetch(
    `https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts?collection=0x40941ee94980e0fc623311b31c20fbae56673d81`,
    {
      headers: {
        "X-API-KEY": process.env.OPENSEA_API
      }
    }
  );

  const data = await r.json();

  const nfts = (data.nfts || []).map(n => ({
    image: n.image_url || n.display_image_url
  }));

  res.status(200).json({ nfts });
}
