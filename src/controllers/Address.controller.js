import { APIerror } from "../utils/APIerror.js";
import { APIresponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {Address} from "../models/address.models.js";
import {User} from "../models/user.models.js"


const SetAddress = AsyncHandler(async (req, res) => {
    let { roomNo, building, street, city, pincode } = req.body;

    // 1. Basic validation (required + trim)
    if (
        !roomNo ||
        !building?.trim() ||
        !street?.trim() ||
        !city?.trim() ||
        !pincode
    ) {
        throw new APIerror(400, "All fields are required");
    }

    // 2. Trim inputs
    // roomNo = roomNo.trim();
    building = building.trim();
    street = street.trim();
    city = city.trim();

    // 3. Pincode validation (India specific)
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) {
        throw new APIerror(400, "Invalid pincode");
    }

    // // 4. Length validation (optional but recommended)
    // if (city.length < 2 || city.length > 50) {
    //     throw new APIerror(400, "City name is invalid");
    // }

    // 5. Create address
    const address = await Address.create({
        roomNo,
        building,
        street,
        city,
        pincode,
        owner: req.user._id
    });

    
    res.status(200).json(
        new APIresponse(200, address, "Address added successfully")
    );
});

const GetUserAddress =AsyncHandler(async(req,res)=>{
    const UserAddress = await Address.find({owner:req.user.id})

    if(!UserAddress){
        throw new APIerror(400,"Not found")
    }
    res.status(200).json(
        new APIresponse(200,UserAddress,"Success!")
    )
})

const SetDefaultAddress = AsyncHandler(async (req,res)=>{
    // const isDefalut = await Address.findByIdAndUpdate(req.user._id,{})
    const {addressId} = req.params
    console.log(addressId)
    if(!addressId){
        throw new APIerror(400,"Address Id is Required")
    }
    const isAddressExist = await Address.findById(addressId)
    if(!isAddressExist){
        throw new APIerror(404,"Address Not Found")
    }
     await Address.updateMany(
    { owner: req.user._id },
    { $set: { isDefault: false } }
  );

    const defaultAddress = await Address.findByIdAndUpdate(addressId,{
        $set:{
            isDefault:true
        }
    },{new:true})
    // 6. Update user with new address
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: { address: defaultAddress._id }
        },
        { new: true }
    );

    res.status(200).json(
        new APIresponse(200,defaultAddress,"Address Set as Default Successfully")
    )
}
)
export {SetAddress,GetUserAddress,SetDefaultAddress}