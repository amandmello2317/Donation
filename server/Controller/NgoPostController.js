const NgoPostSchema = require("../Model/NgoPostSchema");


const NgoPostInsert = async (req, res) => {

    try {
        // const  ngopost = req.files;
        // const  ngopost = req.files.map((i) => i);
        // console.log(ngopost,100);

        const filenames = req.files.map((file) => file.filename);

        console.log(filenames, 100);
        const ngoId = req.params.id

        console.log(ngoId);

        const ngo = await new NgoPostSchema({
            ngopost: filenames,
            ngoId: ngoId
        })
        const savengo = await ngo.save()
        console.log(savengo)
        res.json(savengo)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")

    }
}

// view Post 

const PostView = async (req, res) => {
    const ngoId = req.params.id
    console.log(ngoId);

    try {
        const ngopost = await NgoPostSchema.find({ ngoId: ngoId })
        res.json(ngopost)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }

}

module.exports = {NgoPostInsert, PostView}
