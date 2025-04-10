import express from 'express';
import { createProject,updateProject,getProject,getAllProject,joinProject,getRequest,acceptRequest,rejectRequest,getTeam,deleteProject,removeMember} from '../controllers/projectController.js';
const router = express.Router();
//Project Creation


router.post('/create',createProject);
router.delete('/delete/:id',deleteProject);
router.post('/removeMember/:id',removeMember);
router.get('/get/:id',getProject);
router.get('/',getAllProject);
router.patch('/update/:id',updateProject);
router.post('/join/:id',joinProject);
router.get('/request/:id',getRequest);
router.get('/team/:id',getTeam);
router.post('/accept/:id',acceptRequest);
router.post('/reject/:id',rejectRequest);


export default router;