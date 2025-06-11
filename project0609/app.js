import express from 'express';
import userRouter from "./routes/user.router.js"
import postRouter from "./routes/post.router.js"

const app = express();
const port = 3000;

// JSON 파싱 미들웨어
app.use(express.json());

// 기본 라우터 (예시)
app.get('/', (req, res) => {
  res.send('Hello ES6 Express!');
});

app.use('/', userRouter)
app.use('/', postRouter)

// 서버 실행
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});