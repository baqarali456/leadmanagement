import { Router } from "express";
import { deleteLead, getAllLeads, getUserLead, updateLead } from "../controllers/lead.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const leadRouter = Router()
leadRouter.use(verifyJWT,verifyAdmin);

leadRouter.route('/getAllLeads').get(getAllLeads);
leadRouter.route('/getnewLead').post(getUserLead);
leadRouter.route('/updateLead/:leadId').patch(updateLead);
leadRouter.route('/deleteLead/:leadId').delete (deleteLead);


export {
    leadRouter,
}
