import { registerNewUser,loginUser } from "../services/authService.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await registerNewUser(name, email, password);
    res.status(201).json({
        message: "User registered successfully",
        user,
    });
    } catch (error) {   
        res.status(400).json({ error: error.message });
};
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const data = await loginUser(email, password);
    res.status(200).json({
        message:"Login successful",
        token:data.token,
    });
    } catch (error) {   
        res.status(400).json({ error: error.message });
};
};
