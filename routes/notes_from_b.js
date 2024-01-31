var express = require("express");
var router = express.Router();
const cors = require("cors"); // corsミドルウェアを追加
require("dotenv").config();

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// corsミドルウェアを使用
router.use(cors());

router.get("/", async (req, res) => {
  // データベース、コレクションを指定
  const database = client.db("notes");
  const notes = database.collection("notes");

  // 全てのドキュメントを取得
  const note = await notes.find({}).toArray();

  res.json(note);
});
router.post("/", async (req, res) => {
  const query = req.query;
  const databse = client.db("notes");
  const notes = databse.collection("notes");
  await notes.insertOne({
    name: query.name,
    email: query.email,
    tel: Number(query.tel),
  });
  res.json({ ok: true });
});

module.exports = router;
