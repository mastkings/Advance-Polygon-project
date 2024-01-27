const fs = require('fs');
const path = require('path');

const metadata = path.join(__dirname, 'metadata');
if (!fs.existsSync(metadata)) {
    fs.mkdirSync(metadata);
}

console.log(__dirname);

for (let i = 1; i <= 5; i++) {
    const json = {
        name: `Kings NFT #${i}`,
        description: `Image about African Black culture #${i}`,
        image: `https://gateway.pinata.cloud/ipfs/QmcKBhCbyaedQQuM8oqKXJV3d1ZZx93vsnMP4HWi3vvJEo/pinata${i}.jpg`
    };

    fs.writeFileSync(path.join(metadata, String(i)), JSON.stringify(json));
}
console.log("metadata successfully generated")