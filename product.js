const cheerio = require("cheerio");
const axios = require('axios').default;
const log = console.log;
const { sleep } = require('./utils')


// let product = {
//     ID: "",
//     Type: "simple",
//     SKU: "",
//     Name: title,
//     Published: 1,
//     "Is featured?": 0,
//     "Visibility in catalog": "visible",
//     "Short description": short_desc,
//     Description: desc,
//     "Date sale price starts": "",
//     "Date sale price ends": "",
//     "Tax status": "taxable",
//     "Tax class": "",
//     "In stock?": 1,
//     Stock: "",
//     "Low stock amount": "",
//     "Backorders allowed?": 0,
//     "Sold individually?": 0,
//     "Weight(kg)": "",
//     "Length(cm)": "",
//     "Width(cm)": "",
//     "Height(cm)": "",
//     "Allow customer reviews?": 1,
//     "Purchase note": "",
//     "Sale price": "",
//     "Regular price": regular_price,
//     Categories: category,
//     Tags: "",
//     "Shipping class": "",
//     Images: img.join(),
//     "Download limit": "",
//     "Download expiry days": "",
//     Parent: "",
//     "Grouped products": "",
//     Upsells: "",
//     "Cross-sells": "",
//     "External URL": "",
//     "Button text": "",
//     Position: 0,
//     "Attribute 1 name": "Kiểu",
//     "Attribute 1 value(s)": category,
//     "Attribute 1 visible": 0,
//     "Attribute 1 global": 1,
//     "Attribute 1 default": "",
//     "Attribute 2 name": "",
//     "Attribute 2 value(s)": "",
//     "Attribute 2 visible": 0,
//     "Attribute 2 global": 1,
//     "Attribute 2 default": "",
//     "Attribute 3 name": "",
//     "Attribute 3 value(s)": "",
//     "Attribute 3 visible": 0,
//     "Attribute 3 global": 1,
//     "Attribute 3 default": "",
//     "Attribute 4 name": "",
//     "Attribute 4 value(s)": "",
//     "Attribute 4 visible": 0,
//     "Attribute 4 global": 1,
//     "Attribute 4 default": "",
//     "Attribute 5 name": "",
//     "Attribute 5 value(s)": "",
//     "Attribute 5 visible": 0,
//     "Attribute 5 global": 1,
//     "Attribute 5 default": "",
//     "Attribute 6 name": "",
//     "Attribute 6 value(s)": "",
//     "Attribute 6 visible": 0,
//     "Attribute 6 global": 1,
//     "Attribute 6 default": "",
//     "Attribute 7 name": "",
//     "Attribute 7 value(s)": "",
//     "Attribute 7 visible": 0,
//     "Attribute 7 global": 1,
//     "Attribute 7 default":   "",
//     "Attribute 8 name": "",
//     "Attribute 8 value(s)": "",
//     "Attribute 8 visible": 0,
//     "Attribute 8 global": 1,
//     "Attribute 8 default": "",
//     "Attribute 9 name": "",
//     "Attribute 9 value(s)": "",
//     "Attribute 9 visible": 0,
//     "Attribute 9 global": 1,
//     "Attribute 9 default": "",
// };


const fetchData = async(url) => {
    sleep(500);
    return (await axios.get(url)).data;
}

const splitSku = (str) => {
    let newStr = str.split(' ');
    return newStr[newStr.length - 1];
}

const convertDescription = (descHTML) => {
    let $ = cheerio.load(descHTML);
    return $('p').text();
}

const setDetailsProduct = (data) => {
    return {
        ID: data.id,
        Type: data.type,
        SKU: data.sku,
        Name: data.name,
        Published: 1,
        "Is featured?": 0,
        "Visibility in catalog": "visible",
        "Short description": data.shortDescription,
        Description: data.description,
        "Date sale price starts": "",
        "Date sale price ends": "",
        "Tax status": "taxable",
        "Tax class": "",
        "In stock?": 1,
        Stock: data.stock,
        "Low stock amount": "",
        "Backorders allowed?": 0,
        "Sold individually?": 0,
        "Weight(kg)": "",
        "Length(cm)": "",
        "Width(cm)": "",
        "Height(cm)": "",
        "Allow customer reviews?": 1,
        "Purchase note": "",
        "Sale price": "",
        "Regular price": data.regularPrice,
        Categories: data.categories,
        Tags: data.tags,
        "Shipping class": "",
        Images: data.images,
        "Download limit": "",
        "Download expiry days": "",
        Parent: data.parent,
        "Grouped products": "",
        Upsells: "",
        "Cross-sells": "",
        "External URL": "",
        "Button text": "",
        Position: data.position,
        "Attribute 1 name": "",
        "Attribute 1 value(s)": "",
        "Attribute 1 visible": 0,
        "Attribute 1 global": 1,
        "Attribute 1 default": "",
        "Attribute 2 name": "",
        "Attribute 2 value(s)": "",
        "Attribute 2 visible": 0,
        "Attribute 2 global": 1,
        "Attribute 2 default": "",
        "Attribute 3 name": "",
        "Attribute 3 value(s)": "",
        "Attribute 3 visible": 0,
        "Attribute 3 global": 1,
        "Attribute 3 default": "",
        "Attribute 4 name": "",
        "Attribute 4 value(s)": "",
        "Attribute 4 visible": 0,
        "Attribute 4 global": 1,
        "Attribute 4 default": "",
        "Attribute 5 name": "",
        "Attribute 5 value(s)": "",
        "Attribute 5 visible": 0,
        "Attribute 5 global": 1,
        "Attribute 5 default": "",
        "Attribute 6 name": "",
        "Attribute 6 value(s)": "",
        "Attribute 6 visible": 0,
        "Attribute 6 global": 1,
        "Attribute 6 default": "",
        "Attribute 7 name": "",
        "Attribute 7 value(s)": "",
        "Attribute 7 visible": 0,
        "Attribute 7 global": 1,
        "Attribute 7 default": "",
        "Attribute 8 name": data.attr8Name,
        "Attribute 8 value(s)": data.attr8Value,
        "Attribute 8 visible": 1,
        "Attribute 8 global": 0,
        "Attribute 8 default": data.attr8Default,
        "Attribute 9 name": data.attr9Name,
        "Attribute 9 value(s)": data.attr9Value,
        "Attribute 9 visible": 1,
        "Attribute 9 global": 0,
        "Attribute 9 default": data.attr9Default,
    };
}

const fetchDetailsProduct = async(url) => {
    log(url)
    let productGroup = [];
    let product = await fetchData(url);

    let id = product.id;
    let type = "variable";
    let sku = splitSku(product.title);
    let name = product.title;
    let shortDescription = product.metadescription;
    let description = convertDescription(product.description);
    let stock = 20;
    let regularPrice = product.price.toString().slice(0, product.price.toString().length - 2);
    let categories = product.type;
    let tags = product.tags.join();
    let parent = "";
    let images = product.images.slice(0, 2).join();
    let position = 0;
    let attr8Name = product.options[0] ? product.options[0].name : "";
    let attr8Value = product.options[0] ? product.options[0].values.join() : "";
    let attr8Default = product.options[0] ? product.options[0].values[0].toString() : "";
    let attr9Name = product.options[1] ? product.options[1].name : 0;
    let attr9Value = product.options[1] ? product.options[1].values.join() : 0;
    let attr9Default = product.options[1] ? product.options[1].values[0].toString() : 0;


    let parentData = {
        id,
        type,
        sku,
        name,
        shortDescription,
        description,
        stock,
        regularPrice,
        categories,
        tags,
        parent,
        images,
        position,
        attr8Name,
        attr8Value,
        attr8Default,
        attr9Name,
        attr9Value,
        attr9Default
    };

    productGroup = productGroup.concat(setDetailsProduct(parentData));

    product.variants.forEach((ele, index) => {
        if (index < 2) {
            let id = ele.id;
            let type = "variation";
            let sku = ele.sku
            let name = ele.title;
            let shortDescription = "";
            let description = "";
            let stock = 20;
            let regularPrice = ele.price.toString().slice(0, product.price.toString().length - 2);
            let categories = "";
            let tags = "";
            let parent = parentData.sku;
            // let images = ele.featured_image ? ele.featured_image.src : "";
            let images = "";
            let position = index + 1;
            let attr8Name = parentData.attr8Name;
            let attr8Value = ele.option1 || "";
            let attr8Default = "";
            let attr9Name = parentData.attr9Name;
            let attr9Value = ele.option2 || "";
            let attr9Default = "";
            productGroup = productGroup.concat(setDetailsProduct({
                id,
                type,
                sku,
                name,
                shortDescription,
                description,
                stock,
                regularPrice,
                categories,
                tags,
                parent,
                images,
                position,
                attr8Name,
                attr8Value,
                attr8Default,
                attr9Name,
                attr9Value,
                attr9Default
            }));
        }

    });
    return productGroup;
}



module.exports = {
    fetchDetailsProduct
}