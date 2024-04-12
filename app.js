import express from 'express';
import PostRouter from './routes/posts.router.js';

const app = express();
const SERVER_PORT = 3017;

app.use(express.json()); // body parser를 등록해서 Request body로 들어오는 데이터 사용가능
app.use('/api', [PostRouter]); // 앞에 api라는 prefix를 붙여서 다음 router들이 각각 해당하는 api가 붙은 상태로 접근

app.listen(SERVER_PORT, () => {
    console.log(SERVER_PORT, '포트로 서버가 열렸습니다.');
});
