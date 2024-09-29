<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Bài sắp xếp dãy số</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="help.css" />
    <script src="https://kit.fontawesome.com/3da1a747b2.js" crossorigin="anonymous"></script>
</head>

<body>
    <main>
        <h1 id='deBai' align='center'></h1>
        <h3></h3>
        <p>Kéo thả đối tượng vào vị trí</p>
        <div style="display: flex; max-width: 100%; position: relative;">
            <div id='muiTenHienThi'>
                <div>Hướng sắp xếp</div>
                <img src="muiten.png" alt="">
            </div>
            <ul class="draggable-list" id="draggable-list"></ul>
        </div>
        <div style="display: flex;">
            <button class="check-btn" id="check">
                Kiểm tra
                <i class="fas fa-paper-plane"></i>
            </button>
            <button class="check-btn" id="help">
                Trợ giúp
            </button>
        </div>
    </main>

    <div style="padding: 10px;">
        <div class="container1">
            <div>
                <span>Điểm:&ensp;</span><br><span id="point">0</span>
                <p></p>
            </div>
            <div style="text-align: left;">
                <input type="checkbox" name="goiY" id="goiY1" value="goiY1" onchange="showWhenChange1()">
                <label for="goiY1">Không hiên vị trí đúng sai</label> <br>
                <input type="checkbox" name="goiY" id="huonghienthi" value="huonghienthi" onchange="showWhenChange2()">
                <label for="huonghienthi">Hiển thị theo hướng dọc</label> <br>
            </div>
        </div>
        <div id="showhelp" class="hide">
            <input type="submit" value="X" name="partShowreset" class="closeShowHelp">
            <h3>Trợ giúp</h3>
            <div class="container">
                <button class="check-btn" id="help1">
                    Mức 1
                </button>
                <button class="check-btn" id="help2" style="display: none;">
                    Mức 2
                </button>
                <button class="check-btn" id="help3" style="display: none;">
                    Mức 3
                </button>
            </div>
            <div class="container trucSo" style="display: none;">
                <h3 align="center">Trục số từ 1 đến 10</h3>
                <div class="axis-container">
                    <div id="numberAxis"></div>
                    <div class="arrow-down"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="function.js"></script>
    <script src="script.js"></script>
    <script src="help.js"></script>
</body>

</html>