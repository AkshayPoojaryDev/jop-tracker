import {createJob , getUserJobs} from "../services/jobService.js";

//create
export const addJob=async(req,res)=>{
    try{
        const {company, role, status, applied_date, notes} = req.body;
        const job= await createJob(
            req.user.id,
            company,
            role,
            status,
            applied_date,
            notes
        );
        res.status(201).json(job);

    }catch (err) {
  console.log(err);

  res.status(500).json({
    message: err.message,
  });
}
     } //catch (error) {
    //     console.log(req.body);
    //     console.log(req.user);
    //     res.status(500).json({ 
    //         message: error.message 
       //});
//     }
// };
//get
export const fetchJobs = async (req, res) => {
    try{
        const job= await getUserJobs(req.user.id);
        res.status(200).json(job);
    }
//     catch (error) {
//         console.log(req.body);
//         console.log(req.user);
//         res.status(500).json({ 
//             message: error.message
//         });
//     }
// };
catch (err) {
  console.log(err);

  res.status(500).json({
    message: err.message,
  });
}
}
