import express from "express"
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

// 전체 게시글 조회
router.get('/posts', async(req, res, next)=> {
  try {
    const post = await prisma.post.findMany({
      select : {
        postId : true,
        userId : true,
        title : true,
        content : true,
        createAt : true,
        updateAt : true
      },
      orderBy : {
        createAt : 'desc'
      }
    });

    return res.status(200).json({data : post})
  }catch(e) {
    console.error("에러 발생!", e)
    next(e);
  }
})

// 게시글 생성
router.post('/posts', async (req, res, next)=> {
  try {
    const {title, userId, content} = req.body
    
    const newPost = await prisma.post.create({
      data :  {
        userId,
        title,
        content
      }
    })

    return res.status(200).json({
      message :  "게시글이 작성되었습니다.",
      data : newPost
    })
  }catch(e) {
    console.error("에러 발생!", e)
    next(e);
  }
})

// 특정 게시글 조회
router.get('/posts/:postId', async (req, res, next)=> {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where : {postId : +postId},
    })

    if(!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    return res.status(200).json({
      message : "게시글 조회 성공!!!",
      data : post,
    })
  } catch(e) {
    console.error("에러 발생!", e)
    next(e);
  }
})

// 게시글 수정
router.put('/posts/:postId', async (req, res, next)=> {
  try { 
    const { postId } = req.params;
    const {title, content} = req.body;

    const writedPost = await prisma.post.findUnique({
      where : {postId : +postId}
    })

    if(!writedPost) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const updatePost = await prisma.post.update({
      where : {postId : +postId},
      data : {
        title : title || writedPost.title,
        content : content || writedPost.content,
        updateAt : new Date()
      }
    });

    res.status(200).json({
      message : "게시글 수정 완료!",
      data : updatePost
    })
  } catch(e) {
    console.error("에러 발생!", e)
    next(e);
  }
})

// 게시글 삭제
router.delete('/posts/:postId', async (req, res, next)=> {

  try {
    const { postId } = req.params
    const writedPost = await prisma.post.findUnique({
      where : {postId : +postId}
    })
    if(!writedPost) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    await prisma.post.delete({
      where : {postId : +postId}
    })

    return res.status(200).json({
      message : "삭제 되었습니다."
    })
  } catch (e) {
    console.error("에러 발생!", e)
    next(e);
  }
 

})



export default router