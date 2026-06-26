# 📖 Blog-API(Node.js/Express)

這是威利在哪裡的API，處理遊戲邏輯、防作弊session式的遊戲驗證。

## 🛠 技術棧

- Backend: Express.js
- Database: Prisma ORM (PostgreSQL)
- Storage: Cloudflare R2 (S3 Compatible)
- Session: Express Session

## ✨ 核心特色

- 防作弊：將遊戲開始時間跟已尋找到的目標存在session，並檢查遊戲進度。
- 排行榜：取出前10名，並回傳使用者當前名次。

## 📁 專案結構

```
prisma
├── migrations        ＃ 資料庫遷移紀錄
├── seed.js           ＃ 資料庫首次設定資料
└── schema.prisma     ＃ 資料庫模型定義
lib
└── prisma.js         ＃ Prisma 實例
src
├── controllers       ＃ 業務邏輯入口
├── middleware        ＃ session 中間件
├── routes            ＃ 路由定義
├── services          ＃ 資料庫互動層
└── app.js            ＃ 應用程式入口
package-lock.json
package.json
README.md
```

## 🛰 主要 API 端點範例

### 🎮 遊戲接口（Game）

| 方法  | 路徑                       | 說明                  | 
| :--- | :------------------------- | :-------------------- |
| GET  | /api/game/levels           | 取得所有關卡            |
| GET  | /api/game/gameboard/:id    | 使用者登入並取得身份憑證  |
| POST | /api/game/start            | 開始遊戲               |
| POST | /api/game/check-location   | 檢查座標是否正確         |
| POST | /api/game/leaderboards     | 儲存在排行榜            |
| GET  | /api/game/leaderboards/:id | 取得排行榜              |


## 🔑 環境變數設定 (.env)

請在根目錄建立 .env 並參考以下設定：

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/where-is-waldo"
# Session
SESSION_SECRET="your_jwt_secret"
# CORs origin
CORS_ORIGIN="http://localhost:5173,http://localhost:5174"
# Env
NODE_ENV='develop'
```

## 🚀 快速開始

1. 安裝依賴
```
npm install
```

2. 資料庫同步
```
npx prisma generate
npx prisma db push
```

3. 啟動開發伺服器
```
npm run dev
```
