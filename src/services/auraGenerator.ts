export const generateAuraMetadata = () => {
  return {
    sovereignId: `#VOTE-2026-IND-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    timestamp: new Date().toISOString(),
    constituency: 'Verified Local Constituency',
    ipfsLink: 'ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', // Mock CID
    promptUsed: "A futuristic, photorealistic live-action portrait of a warrior-guardian of Indian democracy. The character wears sleek, carbon-fiber armor with glowing neon-saffron (#FF9933) and neon-green (#138808) accents. The guardian holds a crystalline, hexagonal 'Digital Ink Shield' glowing with violet energy. The shield is embossed with the user's local constituency name in futuristic Devanagari/English typography. Cinematic 8K resolution, highly detailed photography, striking realism, avoiding any animated or cartoonish appearance, cyberpunk aesthetic with a blurred silhouette of the Indian Parliament in the background."
  };
};

export const mockMintNFT = async (metadata: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionHash: `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        metadata
      });
    }, 2000);
  });
};
