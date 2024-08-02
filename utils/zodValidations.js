const { z } = require('zod');

// Zod schema for register schema for validations
const zodRegisterSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

//zod schema for login schema for validations
const zodLoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

//zod schema for task validations
const zodTaskSchema = z.object({
    project: z.string().min(1, 'Project ID is required'),
    name: z.string().min(1, 'Task name is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['Backlog', 'In Discussion', 'In Progress', 'Done']),
    tags: z.array(z.string()),
    dueDate: z.string(),
    assignedUser: z.string(),
});

//zod schema for project validations
const zodProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(1, 'Description is required'),
});

module.exports = { zodRegisterSchema, zodLoginSchema, zodTaskSchema, zodProjectSchema }
