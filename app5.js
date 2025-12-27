"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

let station = [
{ id:1, code:"JE01", name:"東京駅"},
{ id:2, code:"JE07", name:"舞浜駅"},
{ id:3, code:"JE12", name:"新習志野駅"},
{ id:4, code:"JE13", name:"幕張豊砂駅"},
{ id:5, code:"JE14", name:"海浜幕張駅"},
{ id:6, code:"JE05", name:"新浦安駅"},
];

let station2 = [
{ id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
{ id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
{ id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
{ id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
{ id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
{ id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
{ id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];


// ---------------------------------------------------
// 1. 関東の都道府県データ (prefectures)
// ---------------------------------------------------
let prefectures = [
    { id: 1, name: "茨城県", capital: "水戸市", population: 2867009, specialty: "納豆", spot: "偕楽園", area: 6097, image: "ibaraki.svg" },
    { id: 2, name: "栃木県", capital: "宇都宮市", population: 1933146, specialty: "餃子", spot: "日光東照宮", area: 6408, image: "tochigi.svg" },
    { id: 3, name: "群馬県", capital: "前橋市", population: 1939110, specialty: "こんにゃく", spot: "草津温泉", area: 6362, image: "gunma.svg" },
    { id: 4, name: "埼玉県", capital: "さいたま市", population: 7344765, specialty: "草加せんべい", spot: "鉄道博物館", area: 3797, image: "saitama.svg" },
    { id: 5, name: "千葉県", capital: "千葉市", population: 6284480, specialty: "落花生", spot: "東京ディズニーリゾート", area: 5157, image: "chiba.svg" },
    { id: 6, name: "東京都", capital: "新宿区", population: 14047594, specialty: "もんじゃ焼き", spot: "東京タワー", area: 2194, image: "tokyo.svg" },
    { id: 7, name: "神奈川県", capital: "横浜市", population: 9237337, specialty: "崎陽軒のシウマイ", spot: "みなとみらい", area: 2416, image: "kanagawa.svg" },
];

// === 関東の都道府県アプリのルーティング ===

// 一覧表示
app.get("/prefectures", (req, res) => {
    res.render('prefectures_list', { data: prefectures });
});

// 新規登録フォーム
app.get("/prefectures/create", (req, res) => {
    res.render('prefectures_form', { mode: 'create', data: {} });
});

// 新規登録処理（項目を追加しました）
// 新規登録処理（feature を削除し、specialty と spot を追加）
app.post("/prefectures", (req, res) => {
    const newId = prefectures.length > 0 ? prefectures[prefectures.length - 1].id + 1 : 1;
    const newData = {
        id: newId,
        name: req.body.name,
        capital: req.body.capital,
        population: parseInt(req.body.population),
        specialty: req.body.specialty, // 名産
        spot: req.body.spot,           // 名所
        area: parseInt(req.body.area),
        image: req.body.image
    };
    prefectures.push(newData);
    res.redirect('/prefectures');
});


// 詳細表示
app.get("/prefectures/:id", (req, res) => {
    const id = req.params.id;
    const target = prefectures.find(item => item.id == id);
    if (target) {
        res.render('prefectures_detail', { data: target });
    } else {
        res.send("データが見つかりません");
    }
});

// 編集フォーム
app.get("/prefectures/edit/:id", (req, res) => {
    const id = req.params.id;
    const target = prefectures.find(item => item.id == id);
    if (target) {
        res.render('prefectures_form', { mode: 'edit', data: target });
    } else {
        res.send("データが見つかりません");
    }
});

// 更新処理（項目を追加しました）
app.post("/prefectures/update/:id", (req, res) => {
    const id = req.params.id;
    const index = prefectures.findIndex(item => item.id == id);
    if (index !== -1) {
        prefectures[index].name = req.body.name;
        prefectures[index].capital = req.body.capital;
        prefectures[index].population = parseInt(req.body.population);
        prefectures[index].specialty = req.body.specialty; // 名産
        prefectures[index].spot = req.body.spot;           // 名所
        prefectures[index].area = parseInt(req.body.area);
        prefectures[index].image = req.body.image;
        res.redirect('/prefectures');
    } else {
        res.send("更新エラー");
    }
});

// 削除処理
app.get("/prefectures/delete/:id", (req, res) => {
    const id = req.params.id;
    const index = prefectures.findIndex(item => item.id == id);
    if (index !== -1) {
        prefectures.splice(index, 1);
        res.redirect('/prefectures');
    } else {
        res.send("削除エラー");
    }
});

// ===================================================
// 2. 日本の名城データ (castles)
// ===================================================
let castles = [
    { id: 1, name: "姫路城", location: "兵庫県", year: 1346, lord: "池田輝政", image: "himeji.svg" },
    { id: 2, name: "大阪城", location: "大阪府", year: 1583, lord: "豊臣秀吉", image: "osaka.svg" },
    { id: 3, name: "名古屋城", location: "愛知県", year: 1612, lord: "徳川家康", image: "nagoya.svg" },
    { id: 4, name: "松本城", location: "長野県", year: 1504, lord: "石川数正", image: "matsumoto.svg" },
    { id: 5, name: "熊本城", location: "熊本県", year: 1607, lord: "加藤清正", image: "kumamoto.svg" },
    { id: 6, name: "彦根城", location: "滋賀県", year: 1622, lord: "井伊直政", image: "hikone.svg" },
    { id: 7, name: "犬山城", location: "愛知県", year: 1537, lord: "織田信康", image: "inuyama.svg" },
];

// === 日本の名城アプリのルーティング ===

// 一覧表示
app.get("/castles", (req, res) => {
    // EJSファイル側で item.location や item.lord を表示するようにしてください
    res.render('castles_list', { data: castles });
});

// 新規登録フォーム
app.get("/castles/create", (req, res) => {
    res.render('castles_form', { mode: 'create', data: {} });
});

// 新規登録処理
app.post("/castles", (req, res) => {
    const newId = castles.length > 0 ? castles[castles.length - 1].id + 1 : 1;
    const newData = {
        id: newId,
        name: req.body.name,             // 城名
        location: req.body.location,     // 所在地 (ex: 兵庫県)
        year: parseInt(req.body.year),   // 築城年
        lord: req.body.lord,             // 主な城主
        image: req.body.image            // 画像ファイル名
    };
    castles.push(newData);
    res.redirect('/castles');
});

// 詳細表示
app.get("/castles/:id", (req, res) => {
    const id = req.params.id;
    const target = castles.find(item => item.id == id);
    if (target) {
        res.render('castles_detail', { data: target });
    } else {
        res.send("データが見つかりません");
    }
});

// 編集フォーム
app.get("/castles/edit/:id", (req, res) => {
    const id = req.params.id;
    const target = castles.find(item => item.id == id);
    if (target) {
        res.render('castles_form', { mode: 'edit', data: target });
    } else {
        res.send("データが見つかりません");
    }
});

// 更新処理
app.post("/castles/update/:id", (req, res) => {
    const id = req.params.id;
    const index = castles.findIndex(item => item.id == id);
    if (index !== -1) {
        castles[index].name = req.body.name;
        castles[index].location = req.body.location;     // 所在地
        castles[index].year = parseInt(req.body.year);   // 築城年
        castles[index].lord = req.body.lord;             // 主な城主
        castles[index].image = req.body.image;           // 画像
        res.redirect('/castles');
    } else {
        res.send("更新エラー");
    }
});

// 削除処理
app.get("/castles/delete/:id", (req, res) => {
    const id = req.params.id;
    const index = castles.findIndex(item => item.id == id);
    if (index !== -1) {
        castles.splice(index, 1);
        res.redirect('/castles');
    } else {
        res.send("削除エラー");
    }
});

// ===================================================
// 3. 日本の世界遺産データ (heritages)
// ===================================================
let heritages = [
    { id: 1, name: "富士山", location: "静岡県・山梨県", year: 2013, type: "文化遺産", image: "fuji.svg" },
    { id: 2, name: "白神山地", location: "青森県・秋田県", year: 1993, type: "自然遺産", image: "shirakami.svg" },
    { id: 3, name: "原爆ドーム", location: "広島県", year: 1996, type: "文化遺産", image: "dome.svg" },
    { id: 4, name: "屋久島", location: "鹿児島県", year: 1993, type: "自然遺産", image: "yakushima.svg" },
    { id: 5, name: "法隆寺", location: "奈良県", year: 1993, type: "文化遺産", image: "horyuji.svg" },
    { id: 6, name: "厳島神社", location: "広島県", year: 1996, type: "文化遺産", image: "itsukushima.svg" },
    { id: 7, name: "白川郷", location: "岐阜県", year: 1995, type: "文化遺産", image: "shirakawa.svg" },
];

// === 世界遺産アプリのルーティング ===

// 一覧表示
app.get("/heritages", (req, res) => {
    res.render('heritages_list', { data: heritages });
});

// 新規登録フォーム
app.get("/heritages/create", (req, res) => {
    res.render('heritages_form', { mode: 'create', data: {} });
});

// 新規登録処理
app.post("/heritages", (req, res) => {
    const newId = heritages.length > 0 ? heritages[heritages.length - 1].id + 1 : 1;
    const newData = {
        id: newId,
        name: req.body.name,             // 遺産名
        location: req.body.location,     // 所在地
        year: parseInt(req.body.year),   // 登録年
        type: req.body.type,             // 遺産種別 (文化/自然)
        image: req.body.image            // 画像ファイル名
    };
    heritages.push(newData);
    res.redirect('/heritages');
});

// 詳細表示
app.get("/heritages/:id", (req, res) => {
    const id = req.params.id;
    const target = heritages.find(item => item.id == id);
    if (target) {
        res.render('heritages_detail', { data: target });
    } else {
        res.send("データが見つかりません");
    }
});

// 編集フォーム
app.get("/heritages/edit/:id", (req, res) => {
    const id = req.params.id;
    const target = heritages.find(item => item.id == id);
    if (target) {
        res.render('heritages_form', { mode: 'edit', data: target });
    } else {
        res.send("データが見つかりません");
    }
});

// 更新処理
app.post("/heritages/update/:id", (req, res) => {
    const id = req.params.id;
    const index = heritages.findIndex(item => item.id == id);
    if (index !== -1) {
        heritages[index].name = req.body.name;
        heritages[index].location = req.body.location;
        heritages[index].year = parseInt(req.body.year);
        heritages[index].type = req.body.type;
        heritages[index].image = req.body.image;
        res.redirect('/heritages');
    } else {
        res.send("更新エラー");
    }
});

// 削除処理
app.get("/heritages/delete/:id", (req, res) => {
    const id = req.params.id;
    const index = heritages.findIndex(item => item.id == id);
    if (index !== -1) {
        heritages.splice(index, 1);
        res.redirect('/heritages');
    } else {
        res.send("削除エラー");
    }
});

app.get("/keiyo_add", (req, res) => {
let id = req.query.id;
let code = req.query.code;
let name = req.query.name;
let newdata = { id: id, code: code, name: name };
station.push( newdata );
res.redirect('/public/keiyo_add.html');
res.render('db1', { data: station });
});

app.get("/keiyo", (req, res) => {
// 本来ならここにDBとのやり取りが入る
res.render('db1', { data: station });
});

app.get("/keiyo2", (req, res) => {
// 本来ならここにDBとのやり取りが入る
res.render('keiyo2', {data: station2} );
});

app.get("/keiyo2/:number", (req, res) => {
// 本来ならここにDBとのやり取りが入る
const number = req.params.number;
const detail = station2[ number ];
res.render('keiyo2_detail', {data: detail} );
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
