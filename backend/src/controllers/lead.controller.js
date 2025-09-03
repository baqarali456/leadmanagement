import { Lead } from "../models/lead.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose"

const getUserLead = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            email,
            source = "Other",
            status = "New",
            AlternateEmail,
            assignedTo,
            city,
            jobInterest,
            qualification,
            passoutYear,
        } = req.body;

        if ([name,
            phoneNumber,
            email,
            source,
            AlternateEmail,
            assignedTo,
            city,
            jobInterest,
            qualification,
            passoutYear].some(field => field?.trim() === "")) {
            return res.status(404).json({
                message: "fields are required"
            })
        }

        const newlead = await Lead.create(
            {
                name,
                phoneNumber,
                AlternateEmail,
                assignedTo,
                city,
                jobInterest,
                qualification,
                passoutYear,
                email,
                source,
                status
            }
        )

        return res
            .status(200)
            .json(
                {
                    message: "get new lead by user",
                    newlead,
                }
            )

    } catch (error) {
        return res
            .status(500)
            .json(
                {
                    message: error?.message || "something went wrong while getting new lead by user",

                }
            )
    }
})


const deleteLead = asyncHandler(async (req, res) => {
    try {
        const { leadId } = req.params;

        if (!isValidObjectId(leadId)) {
            return res.status(404)
                .json(
                    {
                        message: "leadId is  not valid"
                    }
                )
        }

        const deletedLead = await Lead.findByIdAndDelete(leadId)

        if (!deletedLead) {
            return res
                .status(404)
                .json(
                    {
                        message: "lead doesn't exist"
                    }
                )
        }

        return res
            .status(200)
            .json(
                {
                    message: "lead delete successfully",
                    deletedLead
                }
            )


    } catch (error) {
        return res
            .status(500)
            .json(
                {
                    message: error?.message || "something went wrong while deleting  lead "
                }
            )
    }
})


const updateLead = asyncHandler(async (req, res) => {
    try {
        const { leadId } = req.params;

        const { status } = req.body;

        if (!status) {
            return res.status(404)
                .json(
                    {
                        message: "status is required"
                    }
                )
        }

        if (!isValidObjectId(leadId)) {
            return res.status(401)
                .json(
                    {
                        message: "leadId is  not valid"
                    }
                )
        }

        const lead = await Lead.findById(leadId);

        if (!lead) {
            return res
                .status(404)
                .json(
                    {
                        message: "lead doesn't exist"
                    }
                )
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            leadId,
            {
                $set: {
                    status
                }
            },
            {
                new: true
            }
        )



        return res
            .status(200)
            .json(
                {
                    message: "lead update successfully",
                    updatedLead
                }
            )


    } catch (error) {
        return res
            .status(500)
            .json(
                {
                    message: error?.message || "something went wrong while updating  lead "
                }
            )
    }
})


const getAllLeads = asyncHandler(async (req, res) => {
    try {
        const allLeads = await Lead.aggregate([
            {
                $match: {},
            }
        ])


        return res
            .status(200)
            .json({
                message: "get all leads successfully",
                allLeads,
            })


    } catch (error) {
        return res
            .status(500)
            .json(
                {
                    message: error?.message || "something went wrong while getting all leads from the customer "
                }
            )
    }
})



export {
    getUserLead,
    deleteLead,
    updateLead,
    getAllLeads,
}