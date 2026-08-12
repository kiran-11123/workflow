import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED'
}

export interface IOrder extends Document {
    userId: string;
    status: OrderStatus;
    totalAmount: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        userId: {
            type: String,
            required: true,
            index: true
        },

        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.PENDING,
            index: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: 'INR',
            uppercase: true
        }
    },
    {
        timestamps: true,
        collection: 'orders'
    }
);

export const Order = mongoose.model<IOrder>(
    'Order',
    OrderSchema
);