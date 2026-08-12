import mongoose from "mongoose";
import { Document, Schema } from "mongoose";
export var ProductStatus;
(function (ProductStatus) {
    ProductStatus["ACTIVE"] = "ACTIVE";
    ProductStatus["INACTIVE"] = "INACTIVE";
    ProductStatus["OUT_OF_STOCK"] = "OUT_OF_STOCK";
    ProductStatus["DISCONTINUED"] = "DISCONTINUED";
})(ProductStatus || (ProductStatus = {}));
const ProductSchema = new Schema({
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
}, {
    timestamps: true,
    collection: 'products'
});
export const product_model = mongoose.model('Product', ProductSchema);
//# sourceMappingURL=products.model.js.map