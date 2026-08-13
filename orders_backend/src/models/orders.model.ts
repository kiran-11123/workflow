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

export enum PaymentMethods{
    CREDITCARD = 'CREDITCARD',
    DEBITCARD = 'DEBITCARD',
    CASH = 'CASH',
    UPI  = 'UPI'
}

export interface IOrder extends Document {
    userId: string;
    productId: mongoose.Types.ObjectId;
    quantity: number;
    status: OrderStatus;
    totalAmount: number;
    currency: string;
    PaymentMode : string;
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
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
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
        },
        PaymentMode:{
             type : String,
             enum : Object.values(PaymentMethods),
             default : PaymentMethods.CASH,
             uppercase:true
        }
    },
    {
        timestamps: true,
        collection: 'orders'
    }
);

export const orders_model = mongoose.model<IOrder>(
    'Order',
    OrderSchema
);