import getData from "./get-data.js";

export default async function decoder() {
    const datas = await getData();

    const hexDatas = datas.filter(d => d.hexData);

    const decodedValues = hexDatas.map(hexData => {
        return { 
            "device": hexData.device,
            "DecodedValues": decodeHexData(hexData.hexData), 
        }
    })

    return decodedValues;
}

function decodeFloat32LE(hex) {
    let data = hex.match(/../g).reverse();

    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    data.forEach(function (b, i) {
        view.setUint8(i, parseInt(b, 16));
    });

    return view.getFloat32(0, true);
}

function decodeHexData(hexData) {
    const tempHex = hexData.slice(0, 8);
    const humHex  = hexData.slice(8, 16);
    const presHex = hexData.slice(16, 24);

    return {
        temperature: decodeFloat32LE(tempHex),
        humidity: decodeFloat32LE(humHex),
        pressure: decodeFloat32LE(presHex),
    };
}
