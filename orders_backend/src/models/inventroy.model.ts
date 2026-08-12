import mongoose, { Document, Schema } from 'mongoose';

export interface IInventory extends Document {
    productId: mongoose.Types.ObjectId;
    availableStock: number;
    reservedStock: number;
    reorderLevel: number;
    createdAt: Date;
    updatedAt: Date;
}

const InventorySchema = new Schema<IInventory>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            unique: true,
            index: true
        },

        availableStock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },

        reservedStock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        },

        reorderLevel: {
            type: Number,
            required: true,
            default: 10,
            min: 0
        }
    },
    {
        timestamps: true,
        collection: 'inventory'
    }
);

export const Inventory = mongoose.model<IInventory>(
    'Inventory',
    InventorySchema
);