// Import
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Sequelize = require("sequelize");

// 환경변수 로드
require("dotenv").config();

// 데이터베이스 객체 초기화
const db = {};

// Sequelize 접속 정보 설정
const sequelize = new Sequelize("node_example", "root", "1234", { host: "localhost", dialect: "mysql" });


// Sequelize 연결하여 성공 여부를 반환
sequelize.authenticate().then(() => {
    console.log("연결 성공");
}).catch(err => {
    console.log("연결 실패: ", err);
});

// 현재 디렉토리 내의 .js 파일만을 필터하여 파일 읽기 동기 처리
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
}).forEach(file => {
    // 읽어들인 .js 파일을 자동으로 import
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log(db);
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모듈 내보내기
module.exports = db;