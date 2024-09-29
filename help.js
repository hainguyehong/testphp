document.addEventListener("DOMContentLoaded", function () {
    const numberAxis = document.getElementById("numberAxis");
    // Tạo các đánh dấu và số từ 0 đến 10
    for (let i = 0; i <= 10; i++) {
        const position = (i / 13) * 100 + 10;
        const markerDiv = document.createElement("div");
        markerDiv.className = "numberMarker";
        markerDiv.id = "numberMarker" + i;
        markerDiv.style.left = `${position}%`;
        numberAxis.appendChild(markerDiv);

        const textDiv = document.createElement("div");
        textDiv.className = "numberText";
        textDiv.id = "numberText" + i;
        textDiv.textContent = i;
        textDiv.style.left = `${position}%`;
        numberAxis.appendChild(textDiv);
    }
});

const help = document.querySelector('#help');
const help1 = document.querySelector('#help1');
const help2 = document.querySelector('#help2');
const help3 = document.querySelector('#help3');
const showhelp = document.querySelector('#showhelp');
const closeShowHelp = document.querySelector('.closeShowHelp');
const trucSo = document.querySelector('.trucSo');

help.addEventListener('click', showHelp);
help1.addEventListener('click', helpMuc1)
help2.addEventListener('click', helpMuc2)
help3.addEventListener('click', helpMuc3)
closeShowHelp.addEventListener('click', closeHelp)

function closeHelp() {
    showhelp.classList.add('hide')
}
function showHelp() {
    if (showhelp.classList.contains('hide')) {
        showhelp.classList.toggle('hide')
    }
}
function helpMuc1() {
    let huonghienthi = document.querySelector('#huonghienthi');
    if (quiz.yeuCau == 'yeuCau1') {
        speakVietnamese('BÀI SẮP XẾP THEO THỨ TỰ TĂNG DẦN')
    } else {
        speakVietnamese('BÀI SẮP XẾP THEO THỨ TỰ Giảm DẦN')
    }
    if (huonghienthi.checked) {
        speakVietnamese('Chiều sắp xếp từ trên xuống dưới')
    } else {
        speakVietnamese('Chiều sắp xếp từ trái qua phải')
    }
    if (help2.style.display == "none") {
        help2.style.display = "block"
    } 
}
function speakVietnamese(num) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = num;
    msg.lang = 'vi-VN';
    window.speechSynthesis.speak(msg);
}
function helpMuc2() {
    if (trucSo.style.display == "none") {
        trucSo.style.display = "block"
    } 
    // else {
    //     trucSo.style.display = "none"
    // }
    if (help3.style.display == "none") {
        help3.style.display = "block"
    } 
}
function laySoTuChuoi(chuoi) {
    const so = chuoi.match(/\d+/g); // Sử dụng biểu thức chính quy để lấy ra các số từ chuỗi
    if (so) {
        return so.map(Number); // Chuyển đổi mảng chuỗi số thành mảng số nguyên
    } else {
        return []; // Trả về mảng rỗng nếu không tìm thấy số trong chuỗi
    }
}
function checkDeBai(num) {
    return quiz.deBai.some(e => e == num);
}
function helpMuc3() {
    speakVietnamese('Theo chiều mũi tên từ số phía trước nhỏ hơn số phía sau')
    const numberText = document.querySelectorAll('.numberText')
    numberText.forEach(item => {
        let num = laySoTuChuoi(item.id)[0]
        if (checkDeBai(num)) {
            item.classList.add('truehelp')
        }
    })
    
    const numberMarker = document.querySelectorAll('.numberMarker')
    numberMarker.forEach(item => {
        let num = laySoTuChuoi(item.id)[0]
        if (checkDeBai(num)) {
            item.classList.add('truehelpMarker')
        }
    })
}