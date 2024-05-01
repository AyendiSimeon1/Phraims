import React from "react";



const Navbar = () => {

    return (
        <div className="flex m-5 px-5 mx-3 justify-between items-center font-bold text-slate-900">
           <div>
            <h3 className="text-slate-900 text-bold p-3 text-2xl">Phraims</h3>
            </div>
            <div className="flex mx-5 text-xl">
                <p className="px-3 mx-5">Home</p>
                <p className="px-3 mx-5">About</p>
                <p className="px-3 mx-5">Privacy</p>
            </div>
            <div>
            <button className="px-5 py-1 rounded-full text-white bg-yellow-500">Signup</button>
            </div>
        </div>

    )
}

export default Navbar;