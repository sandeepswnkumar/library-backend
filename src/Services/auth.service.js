import bcrypt from "bcrypt";

export const checkPassword = async (user, password) => {
    if (!user || !user.password) {
        return false; // User not found or no password stored
    }
    return await bcrypt.compare(password, user.password);
};