const RequestFoodSchema = require("../Model/RequestFoodSchema");
const FoodPostSchema = require('../Model/FoodPost')


// SEND NOGO SEND REQUEST AND CREATE A REQUEST
const FoodPostRequest = async (req, res) => {
    const foodpostId = req.params.postid;
    const ngoId = req.params.ngoid;

    const findpost = await FoodPostSchema.findById({ _id: foodpostId }).populate("catId")
    cid = findpost.catId._id

    // console.log(cid);
    // res.json(cid)
    try {
        const FoodPost = await new RequestFoodSchema({
            foodpostId: foodpostId,
            ngoId: ngoId,
            catId: cid,
            request: 'pending'
        })

        const savefoodPost = await FoodPost.save()
        res.json(savefoodPost)
    } catch (error) {

        console.log(error);
        res.status(500).send("Internal error")

    }
}
// NGO VIEW HIS REQUEST
const NgoFindFoodRequest = async (req, res) => {
    const ngoId = req.params.id

    try {
        const foodrequest = await RequestFoodSchema.find({ ngoId: ngoId }).populate("foodpostId catId").populate("ngoId", "-password")
            .sort("-createdAt")

        // console.log({foodrequest});
        res.json(foodrequest)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }
}


// CATERNING VIEW THE REQUEST
const FindFoodRequest = async (req, res) => {
    const catId = req.params.id

    try {
        const foodrequest = await RequestFoodSchema.find({ catId: catId }).populate("foodpostId").populate("ngoId", "-password")
        

        // console.log({foodrequest});
        res.json(foodrequest)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }
}

// NGO DELETING THE REQUEST MADE 
const DeleteFoodRequest = async (req, res) => {
    const postid = req.params.id

    try {
        const deleterequest = await RequestFoodSchema.findByIdAndDelete({ _id: postid })
        res.json({ deleterequest })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }

}

// CATERNING ACCEPTING THE REQUEST
const AccepFoodRequest = async (req, res) => {
    // const request = req.body
    try {
        const acceptfood = await RequestFoodSchema.findByIdAndUpdate(req.params.id, { request: "accept" }, { new: true })
        res.json(acceptfood)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// CANCLING THE ACCEPTED REQUEST
const CancleFoodRequest = async (req, res) => {
    // const request = req.body
    try {
        const acceptfood = await RequestFoodSchema.findByIdAndUpdate(req.params.id, { request: "pending" }, { new: true })
        res.json(acceptfood)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}


// CATERNING REJECT THE REQUEST AND DELETE THE REQUEST
const RejectFoodRequest = async (req, res) => {
    const postid = req.params.id

    try {
        const deleterequest = await RequestFoodSchema.findByIdAndDelete({ _id: postid })
        res.json({ deleterequest })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }

}

module.exports = { FoodPostRequest, FindFoodRequest, DeleteFoodRequest, AccepFoodRequest, RejectFoodRequest, NgoFindFoodRequest, CancleFoodRequest }