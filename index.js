const cheerio = require("cheerio");
const axios = require('axios').default;
const fs = require('fs');
const papa = require('papaparse')

const { sleep, removeDuplicate } = require('./utils')
const { fetchDetailsProduct } = require('./product')
const mkdirp = require('mkdirp');
const log = console.log;



const getLinkAllProducts = ($) => {
    let products = [];
    $("#PageContainer > main > div.grid > div.grid__item.large--three-quarters > div.grid.product-list > div > div > div > div.product--loop__info").map((index, ele) => {
        let url = "https://aristino.com" + $(ele).find("a").attr("href") + ".js";
        // log(ele)
        products.push(url);
    })
    return products;
}

const convertCheerio = (html) => {
    return cheerio.load(html);
}

const fetchHTML = async(url) => {
    log(url);
    sleep(500);
    return (await axios.get(url)).data;
}



const createStatics = (url, fileSave, arr) => {
    let arrParent = arr.filter(ele => ele.Parent === "");
    let arrChild = arr.filter(ele => ele.Parent !== "");
    return {
        url,
        fileSave,
        sum_pd: arr.length,
        parent_pd: arrParent.length,
        images_parent_pd: arrParent.map(ele => ele.Images.split(',').length).reduce((a, b) => a + b),
        child_pd: arrChild.length,
        images_child_pd: arrChild.map(ele => ele.Images.split(',').length).reduce((a, b) => a + b),
        categories: removeDuplicate(arrParent.map(ele => ele.Categories)),
        tags: removeDuplicate(arrParent.map(ele => ele.Tags))
    }
}

const saveDataToJSON = async(fileSave, url, amountPage) => {
    let listProducts = [];
    let listDetailsProducts = [];
    let conti = true;
    let i = 1;
    do {
        // lấy mã html của trang cần crawl
        let html = await fetchHTML(url + i);
        // chuyển sang kiểu giống Jquery để m thao tác với các tag cho dễ
        let $ = convertCheerio(html);
        // crawl từ link phía trên => danh sách link các sp
        let products = getLinkAllProducts($);
        listProducts = listProducts.concat(products);

        //handle dowhile
        i++;
        if (products.length === 0) {
            conti = false;
        }
    } while (i <= amountPage && conti === true); //(conti === true);

    // lấy chi tiết của sp
    for (const ele of listProducts) {
        let product = await fetchDetailsProduct(ele);
        listDetailsProducts = listDetailsProducts.concat(product);
    }
    // log(typeof listDetailsProducts[0].Images)

    // trích xuất ra thông số, thống kê
    let statics = createStatics(url, fileSave, listDetailsProducts);

    // lưu lại kq
    let csv = papa.unparse(listDetailsProducts);
    mkdirp.sync("./results/" + fileSave); // tạo thư mục
    fs.writeFileSync("./results/" + fileSave + "/" + fileSave + "_product.json", JSON.stringify(listDetailsProducts));
    fs.writeFileSync("./results/" + fileSave + "/" + fileSave + "_statics.json", JSON.stringify(statics));
    fs.writeFileSync("./results/" + fileSave + "/" + fileSave + "_import.csv", csv);

}

const main = () => {
    let title = "ao-blazer-nam";
    let url = "https://aristino.com/collections/" + title + "?page=";
    let amountPage = 10;
    saveDataToJSON(title, url, amountPage);
}

main();