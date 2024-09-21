
import { User } from '../../../Model/userSchema/userSchema.js';
import signUpValidation from '../../../middleware/joivalidation/signUpValidation.js';
import { hashedPassword } from '../../../utils/bcrypt.js';

// Registration
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists..." });
        }

        const validatedUser = await signUpValidation.validateAsync({ email, name, password });
        const hashedPass = await hashedPassword(password);

        const newUser = new User({
            email: validatedUser.email,
            name: validatedUser.name,
            password: hashedPass
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({
                success: false,
                message: `Validation error: ${error.message}`
            });
        }
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}


