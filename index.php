<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bài sắp xếp dãy số</title>
    <link rel="stylesheet" href="form.css">
</head>

<body>
    <div class="form">
        <h3>Nhập thông tin bài tập dạng sắp xếp dãy số</h3>

        <form method="post" id="form">
            <label for="numQuestion">Nhập số lượng số cần sắp xếp:</label>
            <div>
                <input type="number" name="numQuestion" id="numQuestion" value="<?php if (isset($_POST['numQuestion'])) {
                    echo $_POST['numQuestion'];
                } ?>" min="2" max="10">
                <br>
                <?php
                if (isset($_POST['gui']) && empty($_POST['numQuestion'])) {
                    echo "<span class=\"error\">Không để trống</span>";
                }
?>
            </div>
            <label>Dạng bài:</label>
            <div style="display: block">
                <div>
                    <input type="radio" name="dang" id="dang1" value="dang1" <?php if (isset($_POST['dang']) && $_POST['dang'] == 'dang1') {
                        echo 'checked';
                    } ?>>
                    <label for="dang1">Trả lời 1 lần</label> <br>
                    <input type="radio" name="dang" id="dang2" value="dang2" <?php if (isset($_POST['dang']) && $_POST['dang'] == 'dang2') {
                        echo 'checked';
                    } ?>>
                    <label for="dang2">Trả lời nhiều lần có trừ điểm nếu trả lời sai (mỗi lần sai trừ 5% số điểm, tối đa 19 lần)</label> <br>
                    <input type="radio" name="dang" id="dang3" value="dang3" <?php if (isset($_POST['dang']) && $_POST['dang'] == 'dang3') {
                        echo 'checked';
                    } ?>>
                    <label for="dang3">Trả lời nhiều lần không trừ điểm</label> <br>
                    <?php
                    if (isset($_POST['gui']) && empty($_POST['dang'])) {
                        echo "<span class=\"error\">Vui lòng chọn</span>";
                    }
?>
                </div>
            </div>
            <label>Yêu cầu:</label>
            <div style="display: block">
                <div>
                    <input type="radio" name="yeuCau" id="yeuCau1" value="yeuCau1" <?php if (isset($_POST['yeuCau']) && $_POST['yeuCau'] == 'yeuCau1') {
                        echo 'checked';
                    } ?>>
                    <label for="yeuCau1">Sắp xếp tăng dần</label> <br>
                    <input type="radio" name="yeuCau" id="yeuCau2" value="yeuCau2" <?php if (isset($_POST['yeuCau']) && $_POST['yeuCau'] == 'yeuCau2') {
                        echo 'checked';
                    } ?>>
                    <label for="yeuCau2">Sắp xếp giảm dần</label> <br>
                    <?php
                    if (isset($_POST['gui']) && empty($_POST['yeuCau'])) {
                        echo "<span class=\"error\">Vui lòng chọn</span>";
                    }
?>
                </div>
            </div>
            <input type="submit" value="Gửi" name="gui">
            <input type="submit" value="Nhập lại" name="reset">

            <?php
            if (isset($_POST['gui'])) {
                if (!empty($_POST['numQuestion']) && !empty($_POST['dang']) && !empty($_POST['yeuCau'])) {
                    $numQuestion = $_POST['numQuestion'];
                    $_SESSION['num'] = $numQuestion;
                    echo '<h4 for="">Nhập các số cần sắp xếp (không nhập 2 số giống nhau)<br>Khi nhập xong nhấn enter để cập nhập</h4>';
                    for ($i = 1; $i <= $numQuestion; $i++) {
                        echo "<label>Số thứ " . $i . ":</label>
                                <div>
                                    <input type=\"number\" onchange='resetData()' class=\"number\" id=\"numQ{$i}\" min=\"0\" max=\"10\" name=\"number{$i}\" value=\"" . (isset($_POST['number' . $i]) ? $_POST['number' . $i] : "") . "\">";
                        echo "<span class=\"error\" id=\"error{$i}\"></span>";
                        echo "</div>";
                    }
                    echo '<input type="submit" value="Xuất câu hỏi" name="gui1" onclick="showFormSubmit()">';
                }
            }
if (isset($_POST['reset'])) {
    header("Location: $_SERVER[PHP_SELF]");
    exit();
}
?>

        </form>
    </div>
    <script src="function.js"></script>
    <script>
        let soLuongPhanTu = <?php echo $_SESSION['num']; ?>;
        let numArr = []
        let dapAnDung = []
        let lession = []
        upLocalStorage('BaiTapSapXep', lession)
        upLocalStorage("numArr", numArr)

        function resetData() {
            numArr = []
            upLocalStorage("numArr", numArr)
        }

        function showFormSubmit() {
            event.preventDefault();
            let isValid = true;
            for (let i = 1; i <= soLuongPhanTu; i++) {
                let inputValue = document.getElementById("numQ" + i).value;
                let msg_errorForm = document.getElementById("error" + i)
                if (inputValue === "") {
                    msg_errorForm.innerHTML += `<br>Vui lòng nhập thông tin`;
                    isValid = false;
                } else {
                    msg_errorForm.innerHTML = "";
                    numArr[i - 1] = inputValue
                    dapAnDung[i - 1] = inputValue
                    if (inputValue > 10 || inputValue < 0) {
                        msg_errorForm.innerHTML += `<br>Số phải nằm trong khoảng từ 0 đến 10`;
                        isValid = false;
                    }
                }
            }

            upLocalStorage("numArr", numArr)
            let numDuplicate = []
            for (let j = 0; j < soLuongPhanTu - 1; j++) {
                for (let a = j + 1; a < soLuongPhanTu; a++) {
                    if (numArr[j] == numArr[a]) {
                        numDuplicate.push(numArr[j])
                        isValid = false
                    }
                }
            }
            numDuplicate = [...new Set(numDuplicate)]
            console.log(numDuplicate)
            for (let i = 1; i <= soLuongPhanTu; i++) {
                let inputValue = document.getElementById("numQ" + i);
                let msg_errorForm = document.getElementById("error" + i)
                inputValue.classList.remove('error')
                numDuplicate.forEach(u => {
                    if (inputValue.value === u) {
                        msg_errorForm.innerHTML += `<br>Các số không trùng nhau`;
                        inputValue.classList.add('error')
                    } else {
                        if (!msg_errorForm.innerHTML) {
                            msg_errorForm.innerHTML = ``;
                        }
                    }
                })
            }
            upLocalStorage("numArr", numArr)
            let obj = {
                deBai: numArr,
                diem: 0,
                dangTraLoi: getSelected_RadioValue('dang'),
                yeuCau: getSelected_RadioValue('yeuCau'),
                soLanTraLoi: 0,
                dapAnDung: dapAnDung.sort((a, b) => (getSelected_RadioValue('yeuCau') === 'yeuCau1') ? a - b : b - a),
                trangThai: 'chuaLam'
            }
            lession.push(obj)
            upLocalStorage('BaiTapSapXep', lession)
            if (!isValid) {
                event.preventDefault();
            } else {
                window.location.href = 'show.php'
            }
        }
    </script>

</body>

</html>