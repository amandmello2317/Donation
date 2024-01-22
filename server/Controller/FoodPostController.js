const FoodPostSchema = require("../Model/FoodPost");


// Insert Food
const FoodPostInsert = async (req, res) => {

    try {
        const { foodtype, location, quandity, description } = req.body

        const filenames = req.files.map((file) => file.filename);

        console.log(filenames, 100);
        const catId = req.params.id

        console.log(catId);

        const foodpost = await new FoodPostSchema({
            foodtype,
            location,
            quandity,
            description,
            foodpostimg: filenames,
            catId: catId
        })
        const savefoodpost = await foodpost.save()
        console.log(foodpost)
        res.json(foodpost)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")

    }
}

// View the post that is uploaded By particular user

const FoodPostView = async (req, res) => {
    const catId = req.params.id
    console.log(catId);

    try {
        const foodpost = await FoodPostSchema.find({ catId: catId }).populate("catId", "-password")
    .sort("-createdAt")

        res.json(foodpost)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }

}

// Delete The Food Post
const FoodPostDelete = async (req, res) => {
    try {
        let post = FoodPostSchema.findById(req.params.id)
        if (!post) {
            return res.status(404).send("Not Found")
        }
        post = await FoodPostSchema.findByIdAndDelete(req.params.id)
        res.json({ post: post })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// Find All food post
const FodPostViewAll = async (req, res) => {
    try {
        const foodpost = await FoodPostSchema.find().populate("catId", "-password")
    .sort("-createdAt")

        res.json(foodpost)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")

    }
}

// SAVE THE REQUESTED NGO ID in food post
const Ngofoodrequest = async (req, res) => {
    try {
        const foodpost = await FoodPostSchema.findByIdAndUpdate(
            req.params.pid,
                { $push: { requests: req.params.nid } },
                { new: true }
            )
        res.json(foodpost)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}

// REMOVE THE NGO ID FROM THE FOOD POST
const NgoremoveRequest = async (req, res) => {
    try {
        const foodpost = await FoodPostSchema.findByIdAndUpdate(
            req.params.pid,
                { $pull: { requests: req.params.nid } },
                { new: true }
            )
        res.json(foodpost)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Error")
    }
}



module.exports = { FoodPostInsert, FoodPostView, FodPostViewAll, FoodPostDelete,Ngofoodrequest,NgoremoveRequest }
