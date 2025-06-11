import express from "express"
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

// 새로운 사람을 데이터베이스에 추가 
router.post('/users', async(req, res, next) => {
  const {email , password, nickname} =req.body
  try {
      const existingUser = await prisma.users.findUnique({
        where : {email}
      })

  if(existingUser) {
    return res.status(400).json({
      message : "이메일이 존재합니다."
    })
    // console.log(existingUser)
  }
  //  이메일이 있으면 중복 안내

  // 이메일이 없으면 추가
  const newUser = await prisma.users.create({
    data : {
      email,
      password,
      nickname
    }
  })
  return res.status(200).json({
    message: "회원가입 완료!",
    data: newUser
  });
  }
  catch(e) {
    console.log(e)
    next(e);
  }
  //기존에 DB에 이메일이 있는지 없는지 확인
  
})


// 전체 유저 불러 오기 
router.get('/users', async(req, res, next)=> {
  const userList = await prisma.users.findMany()
  return res.status(200).json({
    message : "유저 불러오기 성공!!",
    data : userList
  })
})

// 특정 유저 불러오기 

router.get('/users/:id', async (req, res, next) => {
  const userId = Number(req.params.id);

  try {
    const userInfo = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if (!userInfo) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

     console.log(userInfo)
    return res.status(200).json({
      message: "조회 완료!",
      data: userInfo,
    });
  } catch (error) {
    console.error("에러 발생:", error);
    next(error); // 에러 핸들링 미들웨어로 전달
  }
});

// 정보 수정하기 

router.put("/users/:id", async (req, res, next) => {
  const {email , password, nickname } =req.body;

  const userId = Number(req.params.id);

  console.log("요청받은 userId:", userId);

  try {
    const userInfo = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if(!userInfo) {
      return res.status(404).json({
        message : "유저를 찾을 수 없습니다."
      })}

    if (userInfo.password !== password) {
      return res.status(404).json({
        message : "비밀번호가 일치하지 않습니다."
      })
    }

    const updateData = await prisma.users.update({
      where: { user_id: userId },
      data : {
        nickname : nickname || userInfo.nickname,
        email : email || userInfo.email,
        password : password || userInfo.password,
        updateAt : new Date()
      }
    });

    return res.status(200).json({
      message : "수정 완료",
      data : updateData
    }) 
  } catch (error) {
    console.error("에러 발생:", error);
     next(error);
  }
})


// 삭제하기 

router.delete("/users/:id", async(req, res, next)=> {

  const userId = Number(req.params.id);
  const { password } = req.body;
  try {
    const userInfo = await prisma.users.findUnique({
      where: { user_id: userId },
    });

    if(!userInfo) {
      return res.status(404).json({
        message : "유저를 찾을 수 없습니다."
      })}

    if (userInfo.password !== password) {
      return res.status(404).json({
        message : "비밀번호가 일치하지 않습니다."
      })
    }

    await prisma.users.delete({
      where : {user_id : userId}
    })

    return res.status(200).json({
      message : "삭제 되었습니다."
    })
  }
  catch (error) {
  console.error("에러 발생:", error);
   next(error);
  }
})

// 특정 유저가 작성한 게시글 보기 
router.get('/users/:id/posts', async (req, res, next)=> {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.users.findUnique({
      where : {user_id : userId},
      include : {
        Posts : {
          select : {
            postId : true,
            title : true,
            content : true
          }
        }
      }
    });

    if(!user) {
      return res.status(404).json({
        message : "유저를 찾을 수 없습니다!"
      });
    }
    return res.status(200).json({
      message : "게시글 조회 완료!",
      data : user.Posts
    })
  } catch(e){
    console.error("에러 발생!", e)
    next(e);
  }
})



export default router 