const { NextResponse } = require("next/server");

const logoutUser = async () =>{
    try {
        const res = NextResponse.json({success:true, message:"User logout"});
        res.cookies.set("MWtoken", "", {
            httpOnly: true,
            expires: Date.now()
        });
        return res
    } catch (error) {
        console.log('ERROR:', error);
        return NextResponse.json({success:false, message:"ERRR"});
    };
};

export async function GET() {
    return logoutUser();
}