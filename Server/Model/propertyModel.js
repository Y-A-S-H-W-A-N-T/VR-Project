import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
    room_images: [String],
    room_names: [String]
});

const propertySchema = new Schema({
    location: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    room_info: {
        type: roomSchema,
        required: true
    },
    property_Image:{
        type: String,
    },
    isVerified:{
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property;