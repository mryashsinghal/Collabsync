
import Project from '../models/Project.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

const createProject= async (req,resp)=>{
    try{
        const projectFields = await req.body;
        //console.log(projectFields);
        let project = await Project.create(projectFields);
        if(project){
            let updatedUser = await Profile.findOneAndUpdate(
             {'userId': project.createdBy},
              { $addToSet: { projectsCreated: project._id}}, // Add skills uniquely
              { new: true, runValidators: true }
            );
          }
        resp.status(200).json({project: project});
    }
    catch(err){
     //console.log(err);
     resp.status(500).json({ message: 'Server error', error: err.message || err });
    } 
}   

const getProject = async(req,resp)=>{
    try{
        const {id} = req.params;
        
        if(!id){
            resp.status(404).json({message : "Project Id is required"});
        }
        const result = await Project.findById(id).populate("createdBy", "username");
        //console.log(result);    
        resp.status(201).json({project: result});
    }
    catch(err){
        //console.log(err);
        resp.status(500).json({ message: 'Server error', error: err.message || err });
    }
}

const updateProject = async (req, resp) => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
  
      // Ensure `updatedFields.createdBy` is a valid ID
      if (typeof updatedFields.createdBy === "object" && updatedFields.createdBy._id) {
        updatedFields.createdBy = updatedFields.createdBy._id;
      }
  
      //console.log("Updated Fields:", updatedFields);
  
      // Check if `id` is provided
      if (!id) {
        return resp.status(404).json({ message: "Project Id is required" });
      }
  
      // Find the project by ID
      const result = await Project.findById(id);
      if (!result) {
        return resp.status(404).json({ message: "Project not found" });
      }
  
      // Check if the user is authorized to update the project
      if (result.createdBy.toString() !== updatedFields.createdBy.toString()) {
        return resp.status(403).json({ message: "Only Admin Can Update the Project" });
      }
  
      // Update the project
      const updatedProject = await Project.findByIdAndUpdate(id, updatedFields, { new: true });
      if (!updatedProject) {
        return resp.status(404).json({ error: "Project not found" });
      }
  
      return resp.json({ success: true, updatedProject });
    } catch (err) {
      //console.error("Error updating project:", err);
      resp.status(500).json({ error: "Failed to update Project", details: err.message });
    }
};

const getAllProject = async (req,resp) =>{
    try {
        const { search, techStack, category,collaborationMode,status,createdBy} = req.query;
        let query = {};
        if(search){
            query.projectName = { $regex: search, $options: 'i' };
        }
        if (techStack) {
            query.techStack = { $in: techStack };
        }
        if (category) {
            query.projectType = category;
        }
        if (collaborationMode)
             {query.collaborationMode= collaborationMode;
        }
        if (status) {
            query.status = status;
        }
        if(createdBy){
            query.createdBy = createdBy;
        }

        const projects = await Project.find(query);
        resp.json(projects);
        
    } catch (error) {
        resp.status(500).json({'error' : 'Server Error'})
        
    }
}


const joinProject = async (req,resp) =>{

    try {
                const project_id = req.params.id;
                const { userId, techStack, message } = req.body;
                //console.log(req.body);
                //console.log(project_id);
                const tech = techStack.split(',');
                if(!project_id){
                    return resp.status(404).json({message : "Project Id is required"});
                }
                const project = await Project.findById(project_id);
                if (!project) return resp.status(404).json({ message : "Project not found" });
                if(project.createdBy.toString() === userId){
                    return resp.status(403).json({message : "Admin Can not Make Request Join Request"});
                }
                const existingRequest = project.joinRequests.find(request => request.userId.toString() === userId);
                if (existingRequest) {
                return resp.status(400).json({ message: "User has already made a join request" });
                }
                project.joinRequests.push({ userId, techStack : tech, message, status: "pending" });
                await project.save();
               
                const  updatedUser = await Profile.findOneAndUpdate(
                    {'userId': userId},
                    { $addToSet: { projectsJoined: project_id  } }, // Add skills uniquely
                    { new: true, runValidators: true }
                );
                  
                
                resp.status(200).json({ message: "Request submitted successfully", project });
    } catch (error) {

                 resp.status(500).json({ error: "Failed to update Project" });
        
    }
}

const getRequest = async (req,resp) =>{
    try {

        const project_id = req.params.id;
        if(!project_id){
            return resp.status(404).json({message : "Project Id is required"});
        }
        const project = await Project.findById(project_id,{joinRequests : 1}).populate({ path: 'joinRequests.userId',
            select: 'username'});
        if (!project) return resp.status(404).json({ message : "Project not found" });
        resp.status(200).json({ joinRequests: project.joinRequests });

        
    } catch (error) {
        resp.status(500).json({ error: "Failed to get request" });
        
    }
}

const acceptRequest = async (req, resp) => {
    try {
      const { id } = req.params; // ID of the join request
      const { project_id, designation, summary } = req.body; // Project ID, designation, and summary
  
      // Find the project by its ID
      const project = await Project.findById(project_id);
      if (!project) {
        return resp.status(404).json({ message: "Project not found" });
      }
  
      // Find the join request by its ID and remove it from the joinRequests array
      const joinRequestIndex = project.joinRequests.findIndex(request => request._id.toString() === id);
      if (joinRequestIndex === -1) {
        return resp.status(404).json({ message: "Join request not found" });
      }
  
      const joinRequest = project.joinRequests[joinRequestIndex];
      project.joinRequests.splice(joinRequestIndex, 1);
  
      // Add the user to the teamMembers array with the provided designation and summary
      project.teamMembers.push({
        userId: joinRequest.userId,
        role :designation,
        summary
      });
  
      // Save the updated project
      await project.save();
  
      resp.status(200).json({ message: "Request accepted successfully", project });
    } catch (error) {
      console.log("Error in accepting request", error);
      resp.status(500).json({ error: "Failed to accept the request" });
    }
  };

const rejectRequest  = async(req,resp)=>{
    try {
        const {id} = req.params;
        const  {project_id} = req.body;

        const project = await Project.findById(project_id);
      if (!project) {
        return resp.status(404).json({ message: "Project not found" });
      }
  
      // Find the join request by its ID and remove it from the joinRequests array
      const joinRequestIndex = project.joinRequests.findIndex(request => request._id.toString() === id);
      if (joinRequestIndex === -1) {
        return resp.status(404).json({ message: "Join request not found" });
      }

      project.joinRequests.splice(joinRequestIndex, 1);
      await project.save();

      resp.status(200).json({ message: "Request accepted successfully", project });
        
    } catch (error) {
        resp.status(500).json({error:"Failed to reject the request"});
        
    }
}

const getTeam = async (req,resp) =>{
    try {
        const {id} = req.params;

        const project = await Project.findById(id,{teamMembers : 1}).populate({ path: 'teamMembers.userId',
            select: 'username'});;

        if (!project) return resp.status(404).json({ message : "teamMembers not found" });

        resp.status(200).json({teamMembers: project.teamMembers});

        
    } catch (error) {
        resp.status(500).json({error:"Failed to fetch the members"});
        
    }
}

const deleteProject = async (req, resp) => {
  try {
    const { id } = req.params;

    if (!id) {
      return resp.status(400).json({ message: "Project ID is required" });
    }

    // Find the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return resp.status(404).json({ message: "Project not found" });
    }

    // Remove the project from the admin's `projectsCreated`
    await Profile.findOneAndUpdate(
      { userId: project.createdBy },
      { $pull: { projectsCreated: id } }
    );

    // Remove the project from all team members' `projectsJoined`
    const teamMemberIds = project.teamMembers.map((member) => member.userId);
    await Profile.updateMany(
      { userId: { $in: teamMemberIds } },
      { $pull: { projectsJoined: id } }
    );

    // Delete the project
    await Project.findByIdAndDelete(id);

    resp.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    //console.error("Error deleting project:", error);
    resp.status(500).json({ error: "Failed to delete the project" });
  }
};

const removeMember = async (req, resp) => {
  try {
    const { id } = req.params; // Project ID
    const { memberId } = req.body; // Member ID to remove

    if (!id || !memberId) {
      return resp.status(400).json({ message: "Project ID and Member ID are required" });
    }

    // Find the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return resp.status(404).json({ message: "Project not found" });
    }

    // Check if the user is authorized (only admin can remove members)
    if (project.createdBy.toString() !== req.body.userId) {
      return resp.status(403).json({ message: "Only the admin can remove members" });
    }

    // Find the member in the teamMembers array
    const memberIndex = project.teamMembers.findIndex((member) => member.userId.toString() === memberId);
    if (memberIndex === -1) {
      return resp.status(404).json({ message: "Member not found in the project" });
    }

    // Remove the member from the teamMembers array
    project.teamMembers.splice(memberIndex, 1);

    // Save the updated project
    await project.save();

    // Remove the project from the member's `projectsJoined` in their profile
    await Profile.findOneAndUpdate(
      { userId: memberId },
      { $pull: { projectsJoined: id } }
    );

    resp.status(200).json({ message: "Member removed successfully", project });
  } catch (error) {
  //  console.error("Error removing member:", error);
    resp.status(500).json({ error: "Failed to remove the member" });
  }
};


export {createProject,getProject,updateProject,getAllProject,joinProject,getRequest,acceptRequest,rejectRequest,getTeam,deleteProject,removeMember};