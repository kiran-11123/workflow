import mongoose from "mongoose";
import { Document , Schema } from "mongoose";

export enum ProductStatus{
        ACTIVE = "ACTIVE",
           INACTIVE = 'INACTIVE',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
    DISCONTINUED = 'DISCONTINUED'
}

export interface IProduct extends Document{
      
    name : string,
    description? : string,
    price: number;
    currency: string;
    status: ProductStatus;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {

         name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        currency: {
            type: String,
            default: 'INR',
            uppercase: true
        },

        status: {
            type: String,
            enum: Object.values(ProductStatus),
            default: ProductStatus.ACTIVE,
            index: true
        }
    },
    {
        timestamps: true,
        collection: 'products'
    }
         
    
)

export const product_model = mongoose.model<IProduct>(
    'Product',
    ProductSchema
);