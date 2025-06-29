import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        foods: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                },
            ],
        },
        payment: {

        },
        buyers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'

        },
        status: {
            type: String,
            enum: ['preparing', 'prepared', 'on the way', 'delivered'],
            default: 'preparing'
        }
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
