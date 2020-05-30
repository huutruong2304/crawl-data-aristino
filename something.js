const cheerio = require("cheerio");
const fs = require("fs");
const fethHtml = require("./fetchHtml");
const urls = require("./constants").muahanggiare_balo_thoitrang;

const data = async() => {
    let res = [];
    for (let i = 0; i < urls.length; i++) {
        let html = await fethHtml(urls[i]);
        const $ = await cheerio.load(html);
        const category = $("body").find("#bread span>a>span:last-child").last().text();
        const title = $("body").find(".produce-info>h1").text();
        const trademarks = $("body").find(".produce-info .linkthuonghieu").text().trim();
        let regular_price = $("body").find(".produce-info .price > strong").text().trim();
        const short_desc = $("body").find(".short_desc").html();
        const desc = $("body").find("#motasanpham").html();
        let img = [];
        $("#slider .slides li").each((index, elem) => {
            img.push($(elem).find("img").attr("src"));
        });

        let csv = {
            ID: "",
            Type: "simple",
            SKU: "",
            Name: title,
            Published: 1,
            "Is featured?": 0,
            "Visibility in catalog": "visible",
            "Short description": short_desc,
            Description: desc,
            "Date sale price starts": "",
            "Date sale price ends": "",
            "Tax status": "taxable",
            "Tax class": "",
            "In stock?": 1,
            Stock: "",
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
            "Regular price": regular_price,
            Categories: category,
            Tags: "",
            "Shipping class": "",
            Images: img.join(),
            "Download limit": "",
            "Download expiry days": "",
            Parent: "",
            "Grouped products": "",
            Upsells: "",
            "Cross-sells": "",
            "External URL": "",
            "Button text": "",
            Position: 0,
            "Attribute 1 name": "Brand",
            "Attribute 1 value(s)": category,
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
            "Attribute 8 name": "",
            "Attribute 8 value(s)": "",
            "Attribute 8 visible": 0,
            "Attribute 8 global": 1,
            "Attribute 8 default": "",
            "Attribute 9 name": "",
            "Attribute 9 value(s)": "",
            "Attribute 9 visible": 0,
            "Attribute 9 global": 1,
            "Attribute 9 default": "",
        };
        res.push(csv);
        if (i === urls.length - 1) return res;
    }
};
async function print() {
    const d = await data();
    fs.appendFile("balo.json", JSON.stringify(d), function(err) {
        if (err) throw err;
        console.log("The file has been saved!");
    });
}
print();