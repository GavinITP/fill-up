import mongoose from "mongoose";

const WaterStationSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Water station'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: {
        type: String,
        required: true,
    },
    permission: {
        type: [String],
        required: true,
    },
    waterTemperature: {
        type: [String],
        enum: ["ร้อน", "เย็น", "อุณหภูมิห้อง"],
        required: true,
    },
    maintenanceDetails: {
        type: String,
        required: true,
    },
    isFree: {
        type: Boolean,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    approvalStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        required: true,
        default: "pending"
    },
    note: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

WaterStationSchema.index({ location: '2dsphere' });

const WaterStation = mongoose.model("WaterStation", WaterStationSchema);

export default WaterStation;
