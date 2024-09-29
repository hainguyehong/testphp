const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
const richestPeople = JSON.parse(localStorage.getItem('numArr'))
const Question = JSON.parse(localStorage.getItem('BaiTapSapXep')) || []
const quiz = Question[Question.length -1]
const listItems = [];
let dragStartIndex;
// hiện đề bài
const deBai = document.querySelector('#deBai')
if (quiz.yeuCau == 'yeuCau1') {
    deBai.innerHTML = "<div> BÀI SẮP XẾP THEO THỨ TỰ TĂNG DẦN </div> <div class=\"huongSapXep\">Xắp xếp từ trái qua phải</div> "
} else {
    deBai.innerHTML = "<div> BÀI SẮP XẾP THEO THỨ TỰ GIẢM DẦN </div> <div class=\"huongSapXep\">Xắp xếp từ trái qua phải</div> "
}
// hiện dạng
const dang = document.querySelector('main > h3')
if (quiz.dangTraLoi == "dang1") {
    dang.innerHTML = 'Trả lời một lần duy nhất'
} else if (quiz.dangTraLoi == "dang2") {
    dang.innerHTML = 'Trả lời nhiều lần nhưng mỗi lần sai sẽ bị trừ 20% số điểm của bài (tối đa 5 lần)'
} else {
    dang.innerHTML = 'Trả lời nhiều lần'
}
// xử lí nếu câu trả lời đã xong và khi load lại trang
if (quiz.trangThai != 'chuaLam') {
    check.style.display = 'none';
    help.style.display = 'none'
    document.querySelector('#point').innerHTML = quiz.diem
    richestPeople.sort((a, b) => (quiz.yeuCau === 'yeuCau1') ? a - b : b - a);
    createList()
    checkTrueFalse()
    removeDrapDrop()
    dang.innerHTML = 'Kết thúc bài làm'
    if (quiz.dangTraLoi == "dang2" && quiz.soLanTraLoi >= 5) {
        dang.innerHTML = 'Bạn đã trả lời sai 5 lần, kết thúc bài làm và tự động hiện đáp án đúng'
    }
    if (quiz.dangTraLoi == "dang1" && quiz.soLanTraLoi != 0 && quiz.diem == 0) {
        dang.innerHTML = 'Bạn đã trả lời sai ,kết thúc bài làm và tự động hiện đáp án đúng'
    }
} else {
    createList()
}
// hàm xử lí hiện đối tượng
function createList() {
    [...richestPeople]
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
                        <span class="number" style="display:none;">${index + 1}</span>
                        <div class="draggable" draggable="true">
                            <p class="person-name">${person}</p>
                        </div>
                    `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
    addEventListeners();
}
// kéo thả đối tượng
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    deleteStatusChecked()
}
function dragEnter() {
    this.classList.add('over');
}
function dragLeave() {
    this.classList.remove('over');
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}
// xử lí tính điểm
check.addEventListener('click', checkOrder);
function checkOrder() {
    let isCheck = true
    checkTrueFalse()
    listItems.forEach(u => {
        if(u.classList.contains("wrong")){
            isCheck = false
            return;
        }
    })
    if (!isCheck) {
        quiz.soLanTraLoi++;
        if (quiz.dangTraLoi == "dang1") {
            check.style.display = 'none'
            help.style.display = 'none'
            document.querySelectorAll('.draggable').forEach(u => {
                u.removeAttribute('draggable')
            })
            quiz.trangThai = 'daLam'
        } else {
            quiz.trangThai = 'dangLam'
        }
    } else {
        if (quiz.dangTraLoi == "dang1") {
            quiz.diem = 100
            dang.innerHTML = 'Kết thúc bài làm'
        } else if (quiz.dangTraLoi == "dang2") {
            quiz.diem = (quiz.soLanTraLoi <= 5) ? 100 - 20 * quiz.soLanTraLoi : 0
            dang.innerHTML = 'Kết thúc bài làm'
        } else {
            quiz.diem = 100
            dang.innerHTML = 'Kết thúc bài làm'
        }
        quiz.trangThai = 'daLam'
        check.style.display = 'none'
        help.style.display = 'none'
        document.querySelectorAll('.draggable').forEach(u => {
            u.removeAttribute('draggable')
        })
    }
    document.querySelector('#point').innerHTML = quiz.diem
    // khi vượt quá số lần trả lời cho dang 2
    if (quiz.dangTraLoi == "dang2" && quiz.soLanTraLoi >= 5 && quiz.diem == 0) {
        quiz.trangThai = 'daLam'
        location.reload()
    }
    upLocalStorage('BaiTapSapXep', Question)
    showWhenChange1()
}
function showWhenChange1() {
    let goiY1 = document.querySelector('#goiY1');
    if (goiY1.checked) {
        deleteStatusChecked()
    } else {
        if (quiz.soLanTraLoi != 0) {
            checkTrueFalse()
        }
    }
}
function showWhenChange2() {
    let huonghienthi = document.querySelector('#huonghienthi');
    let huongSapXep = document.querySelector('.huongSapXep')
    if (huonghienthi.checked) {
        document.querySelector('#draggable-list').style.flexDirection = 'column';
        huongSapXep.textContent = 'Sắp xếp từ trên xuống dưới'
    } else {
        document.querySelector('#draggable-list').style.flexDirection = 'row';
        huongSapXep.textContent = 'Sắp xếp từ trái qua phải'
    }
    document.querySelector('#muiTenHienThi > img').classList.toggle('xoayImg_muiten')
}
function deleteStatusChecked() {
    document.querySelectorAll("main li").forEach(u => {
        if (u.classList.contains('wrong')) {
            u.classList.remove('wrong');
        }
        if (u.classList.contains('right')) {
            u.classList.remove('right');
        }
    });
}

function checkTrueFalse(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== quiz.dapAnDung[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function removeDrapDrop(){
    const draggableElements = document.querySelectorAll('.draggable');
    if (draggableElements.length > 0) {
        draggableElements.forEach(u => {
            u.removeAttribute('draggable')
        })
    }
}