import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.
/**
 * 게시글 생성 API
 * 1. title, content, password를 body로 전달받습니다.
 * 2. title, content, password를 이용해 Posts 테이블에 데이터를 삽입합니다.
 * 3. 생성된 게시글을 반환합니다.
 */
router.post('/posts', async (req, res, next) => {
    const { title, content, password } = req.body;
    const post = await prisma.posts.create({
        data: {
            title: title,
            content: content,
            password: password,
        },
    });

    return res.status(201).json({ data: post });
});

/**
 * 게시글 목록 조회 APIE
 */

router.get('/posts', async (req, res, next) => {
    const posts = await prisma.posts.findMany({
        select: {
            postId: true,
            title: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return res.status(200).json({ data: posts });
});

/**
 * 게시글 상세 조회 API
 */
router.get('/posts/:postId', async (req, res, next) => {
    const { postId } = req.params; // params로 전달받은 데이터틑 기본적으로 String 값을 가지고 있어서 Number로 변환이 필요

    const post = await prisma.posts.findFirst({
        where: {
            postId: +postId, //+ 혹은 parseInt() -> postId라는 컬럼이 client로 전달받는 postId 값으로 조회
        },
        select: {
            postId: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return res.status(200).json({ data: post });
});

/**
 * 게시글 수정 API
 * 1. Path Parameters로 어떤 게시글을 수정할 지 postId를 전달 받습니다.
 * 2. 변경할 title, content와 권한 검증을 위한 password를 bodty로 전달 받습니다.
 * 3. postId를 기준으로 게시글을 검색하고, 게시글이 존재하는지 확인합니다.
 * 4. 게시글이 조회되었다면 해당하는 게시글의 password가 일치하는지 확인합니다.
 * 5. 모든 조건을 통과하였다면 게시글을 수정합니다.
 */
router.put('/posts/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, password } = req.body;

    // 기본키 혹은 unique는 특정한 고유한 값을 하나 가질 수 있도록 데이터 베이스가 인지
    const post = await prisma.posts.findUnique({
        where: {
            postId: +postId,
        },
    });

    if (!post) return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });

    // 조회된 게시글의 password와 실제로 클라이언트에게 전달받은 password가 일치하지 않을 때?
    if (post.password !== password) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    await prisma.posts.update({
        data: {
            title: title,
            content: content,
        },
        where: {
            // 우리가 전달 받은 postId와, password가 일치하는지 확인
            postId: +postId,
            password: password,
        },
    });

    return res.status(200).json({ data: '게시글이 수정되었습니다.' });
});

/**
 * 게시글 삭제 API
 */
router.delete('/posts/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const { password } = req.body;

    const post = await prisma.posts.findUnique({
        where: {
            postId: +postId,
        },
    });

    if (!post) return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });

    // 조회된 게시글의 password와 실제로 클라이언트에게 전달받은 password가 일치하지 않을 때?
    if (post.password !== password) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    await prisma.posts.delete({
        where: {
            postId: +postId,
        },
    });

    return res.status(200).json({ data: '게시글이 삭제되었습니다.' });
});

export default router;
