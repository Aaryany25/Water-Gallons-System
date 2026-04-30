import { APIerror } from "../utils/APIerror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Address } from "../models/address.models.js";
import { User } from "../models/user.models.js";
import { addressSchema, addressUpdateSchema } from "../validators/address.schema.js";


const setAddress = AsyncHandler(async (req, res) => {
    const validation = addressSchema.safeParse(req.body);
    if (!validation.success) {
        throw new APIerror(400, validation.error.errors[0].message);
    }

    const address = await Address.create({
        ...validation.data,
        owner: req.user._id
    });

    res.status(201).json(
        new APIresponse(201, address, "Address added successfully")
    );
});

const getUserAddresses = AsyncHandler(async(req,res)=>{
    const addresses = await Address.find({ owner: req.user._id });

    res.status(200).json(
        new APIresponse(200, addresses, "Addresses fetched successfully")
    )
})

const getAddressById = AsyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const address = await Address.findOne({ _id: addressId, owner: req.user._id });

    if (!address) {
        throw new APIerror(404, "Address not found or unauthorized");
    }

    res.status(200).json(
        new APIresponse(200, address, "Address fetched successfully")
    );
});

const updateAddress = AsyncHandler(async (req, res) => {
    const validation = addressUpdateSchema.safeParse(req.body);
    if (!validation.success) {
        throw new APIerror(400, validation.error.errors[0].message);
    }

    const { addressId } = req.params;
    const updatedAddress = await Address.findOneAndUpdate(
        { _id: addressId, owner: req.user._id },
        { $set: validation.data },
        { new: true }
    );

    if (!updatedAddress) {
        throw new APIerror(404, "Address not found or unauthorized");
    }

    res.status(200).json(
        new APIresponse(200, updatedAddress, "Address updated successfully")
    );
});

const deleteAddress = AsyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const deletedAddress = await Address.findOneAndDelete({ _id: addressId, owner: req.user._id });

    if (!deletedAddress) {
        throw new APIerror(404, "Address not found or unauthorized");
    }

    // If this was the user's primary address, unset it
    await User.updateOne(
        { _id: req.user._id, address: addressId },
        { $unset: { address: 1 } }
    );

    res.status(200).json(
        new APIresponse(200, null, "Address deleted successfully")
    );
});

const setDefaultAddress = AsyncHandler(async (req,res)=>{
    const {addressId} = req.params
    
    const isAddressExist = await Address.findOne({ _id: addressId, owner: req.user._id })
    if(!isAddressExist){
        throw new APIerror(404,"Address not found or unauthorized")
    }

    // Set all user addresses to non-default
     await Address.updateMany(
        { owner: req.user._id },
        { $set: { isDefault: false } }
    );

    // Set target address as default
    const defaultAddress = await Address.findByIdAndUpdate(addressId,{
        $set:{
            isDefault:true
        }
    },{new:true})

    // Update user primary address field
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { address: defaultAddress._id }
        },
        { new: true }
    );

    res.status(200).json(
        new APIresponse(200,defaultAddress,"Address set as default successfully")
    )
})

export { setAddress, getUserAddresses, setDefaultAddress, getAddressById, updateAddress, deleteAddress }