const removeDuplicate = (arr = []) => {
    // ý tưởng thuật toán:
    // sắp xếp mảng theo thứ tự
    // thì các giá trị duplicate sẽ thành 1 đoạn liên tiếp nhau 1,1,1,1,2,3,4,4,4,4,5,5,5,5...
    // từ đó lấy giá trị cuối của nó chạy tiếp data tiếp theo
    arr.sort();
    let newArr = [];
    let i = 0;
    do {
        newArr.push(arr[i]);
        i = arr.lastIndexOf(arr[i]) + 1;
    } while (i < arr.length)
    return newArr;
}

const sleep = async(miliseconds) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

module.exports = {
    sleep,
    removeDuplicate
}