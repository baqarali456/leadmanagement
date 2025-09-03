import { Router } from "express";
import { deleteLead, getAllLeads, getUserLead, updateLead } from "../controllers/lead.controller.js";

const leadRouter = Router()

leadRouter.route('/getAllLeads').get(getAllLeads);
leadRouter.route('/getnewLead').post(getUserLead);
leadRouter.route('/updateLead/:leadId').patch(updateLead);
leadRouter.route('/deleteLead/:leadId').delete (deleteLead);


export {
    leadRouter,
}
