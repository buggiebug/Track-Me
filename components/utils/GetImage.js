import { Image } from 'react-native';

export default GetImage = (name, style) => {
    const imageName = String(name).split(" ").join("").toLowerCase();
    let imageSource;
    switch (imageName) {
        case "male":
            imageSource = require('../../assets/images/avatar/male.png');
            break;
        case "female":
            imageSource = require('../../assets/images/avatar/female.png');
            break;
        case "othergender":
            imageSource = require('../../assets/images/avatar/othergender.png');
            break;

        // Bank Logos................................. 
        case "cash":
            imageSource = require('../../assets/images/banks/cash.webp');
            break;
        case "upi":
            imageSource = require('../../assets/images/banks/upi.webp');
            break;
        case "amazonpay":
            imageSource = require('../../assets/images/banks/amazonpay.webp');
            break;
        case "googlepay":
            imageSource = require('../../assets/images/banks/gpay.webp');
            break;
        case "mobikwik":
            imageSource = require('../../assets/images/banks/mobiKwik.webp');
            break;
        case "paypal":
            imageSource = require('../../assets/images/banks/paypal.webp');
            break;
        case "paytm":
            imageSource = require('../../assets/images/banks/paytm.webp');
            break;
        case "phonepay":
            imageSource = require('../../assets/images/banks/phonepay.webp');
            break;
        case "imps":
            imageSource = require('../../assets/images/banks/imps.webp');
            break;
        case "slice":
            imageSource = require('../../assets/images/banks/slice.webp');
            break;
        default:
            imageSource = require('../../assets/images/banks/cash.webp');
            break;
    }

    if (!imageSource) {
        console.error(`Image with name "${imageName}" not found.`);
        return null;
    }
    return <Image source={imageSource} style={style} />;
};