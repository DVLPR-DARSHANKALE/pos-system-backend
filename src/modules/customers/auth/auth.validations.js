const z = require("zod");


const signUpSchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name must not exceed 100 characters"),

        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Please provide a valid email address")
            .max(255, "Email must not exceed 255 characters"),

        phone_number: z
            .string()
            .trim()
            .regex(
                /^\+?[1-9]\d{9,14}$/,
                "Please provide a valid phone number"
            ),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(72, "Password must not exceed 72 characters"),
    }),
});



const signInSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Please provide a valid email address")
            .max(255, "Email must not exceed 255 characters"),
        password: z
            .string()
            .max(72, "Password must not exceed 72 characters"),
    })
});
module.exports = {
    signUpSchema, signInSchema
}