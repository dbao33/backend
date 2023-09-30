import { createUserService } from '../services/userService.js'

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const ress = await createUserService()
        return res.status(200).json(ress)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}
export { createUser }
