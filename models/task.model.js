const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['Backlog', 'In Discussion', 'In Progress', 'Done'],
            required: true,
        },
        tags: [String],
        dueDate: {
            type: Date,
            required: true,
        },
        assignedUser: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
