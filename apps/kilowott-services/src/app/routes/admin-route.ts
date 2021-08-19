import * as express from 'express';
import { Request, Response } from 'express';
import * as multer from 'multer';
import onBoardAdminController from '../controller/admin-controller';
import sendResponse from '../../../../../libs/shared/responseFormatter';
import { isAdmin,isSuperAdmin,isValidate } from '../../../../../libs/shared/middleware/auth';

const upload = multer({
  dest: 'temp/profile/',
  limits: { fileSize: 5 * 1024 * 1024 },
});
const onBoardAdminRouter = express.Router();

//Create the Employee
onBoardAdminRouter.post('/onboard-admin',isSuperAdmin,(req: Request, res: Response) => {
    onBoardAdminController
      .adminSignUp(req)
      .then((data:any) => {
        sendResponse(res,data.status, true, data);
      })
      .catch((err) => {
        sendResponse(res, err.status, false, err);
      });
  }
);

//Login API
onBoardAdminRouter.post('/user-login',
  (req: Request, res: Response) => {
    onBoardAdminController
      .loginUser(req.body)
      .then((data:any) => {
        sendResponse(res,data.status, true, data);
      })
      .catch((err) => {
        sendResponse(res, err.status, false, err);
      });
  }
);

//Add User API
onBoardAdminRouter.post('/add-user',isAdmin,
  (req: Request, res: Response) => {
    onBoardAdminController
      .addUser(req.body)
      .then((data:any) => {
        sendResponse(res,data.status, true, data);
      })
      .catch((err) => {
        sendResponse(res, err.status, false, err);
      });
  }
);

//Update User API
onBoardAdminRouter.put('/update-user/:userId',isValidate,upload.single('file'),(req: Request, res: Response) => {  
  onBoardAdminController
      .updateUser(req)
      .then((data:any) => {
        sendResponse(res,data.status, true, data);
      })
      .catch((err) => {
        sendResponse(res, err.status, false, err);
      });
  }
);

//Delete User End point
onBoardAdminRouter.delete('/delete-user/:userId',isAdmin,(req: Request, res: Response) => {
    onBoardAdminController
      .deleteUser(req.params)
      .then((data:any) => {
        sendResponse(res,data.status, true, data);
      })
      .catch((err) => {
        sendResponse(res, err.status, false, err);
      });
  }
);

//Enable and Disable User
onBoardAdminRouter.put('/update-user-status/:userId',isAdmin,(req: Request, res: Response) => {
  onBoardAdminController
    .updateUserStatus(req) 
    .then((data:any) => {
      sendResponse(res,data.status, true, data);
    })
    .catch((err) => {
      sendResponse(res, err.status, false, err);
    });
}
);

//Change Password
onBoardAdminRouter.put('/change-password',isValidate,(req: Request, res: Response) => {
  onBoardAdminController
    .changePassowrd(req) 
    .then((data:any) => {
      sendResponse(res,data.status, true, data);
    })
    .catch((err) => {
      sendResponse(res, err.status, false, err);
    });
}
);

//Get non admin users
onBoardAdminRouter.get('/get-users',isValidate,(req: Request, res: Response) => {
  onBoardAdminController
    .getAllUserList(req) 
    .then((data:any) => {
      sendResponse(res,data.status, true, data);
    })
    .catch((err) => {
      sendResponse(res, err.status, false, err);
    });
}
);

export default onBoardAdminRouter;
