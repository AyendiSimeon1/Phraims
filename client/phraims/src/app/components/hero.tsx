import image1 from "../assets/images/image1.jpg";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { fabear } from "react-icons";

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const Hero = () => {

    return (
        <div className={roboto.className}>
            <div className=" flex justify-center items-center ">
                <div className="m-5">
                <h1 className="text-6xl text-center text-slate-900 font-bold m-5" >Supercharge Your Business<br /> with 
                Email Marketing</h1>
                <h5 className="text-xl text-center text-slate-500 m-3 p-2 animate-fade-in">Engage, Convert and Retain Customers Like Never Before, <br />Our Email Marketing Solution Puts Your Brand In The Spotlight.</h5>
                <div className="flex mx-2 justify-center items-center my-5">
                    <button className="bg-yellow-500 px-6 rounded-full py-3 m-2 text-white">Get Started</button>
                    <button className=" px-6 py-3 rounded-full m-2 border border-yellow-500">Try For Free</button>
                </div>
                <div className="flex justify-center items-center m-4">
                    <p className="mx-3">General Email Marketing</p>
                    <p className="p-3">B2B Email Marketing</p>
                    <p>Automated Email Marketing</p>
                </div>
                <div className="flex justify-center items-center m-5 p-2">
                        <div className="bg-yellow-100 m-2 p-2">
                            
                            <img src="Image"  className="py-4" width={200} />
                        
                                    <span className="p-2 m-2 bg-black text-white rounded-full">01</span>
                                 <h2 className="text-slate-900 text-2xl py-4">Expanding Your Business</h2>
                                <p>Try out Benchmark for free to discover how simple effective email marketing can be.</p>
                        </div>
                        <div className="bg-yellow-100 m-2 p-2">
                            
                            <img src="Image"  className="py-4" width={200} />
                        
                                    <span className="p-2 m-2 bg-black text-white rounded-full">01</span>
                                 <h2 className="text-slate-900 text-2xl py-4">Expanding Your Business</h2>
                                <p>Try out Benchmark for free to discover how simple effective email marketing can be.</p>
                        </div>
                        <div className="bg-yellow-100 m-2 p-2">
                            
                            <img src="Image"  className="py-4" width={200} />
                        
                                    <span className="p-2 m-2 bg-black text-white rounded-full">01</span>
                                 <h2 className="text-slate-900 text-2xl py-4">Expanding Your Business</h2>
                                <p>Try out Benchmark for free to discover how simple effective email marketing can be.</p>
                        </div>
                    </div>
                    <div className="bg-black flex text-center justify-center items-center">
                        <div>
                            <p className="text-slate-500 text-xl p-4 mx-3">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xl p-4 mx-3 ">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xl p-4 ">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xl p-4 ">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                    </div>
                    </div>
                </div>
             
                
                <div className="flex bg-yellow-200 p-5">
                    <br />
                    <div>
                        <h1 className="text-3xl">Boost Your Business With Phraims</h1>
                        <p>Have you tried ChatGpt or similar tools to write our resume or cover letter but been disappointed by the impersonal respnses?<br />
                            Ever time, Postlander's industry-best personalisation produces conten that is more targeed and superior.
                        </p>
                        <button className="rounded-full bg-yellow-500 px-4 ">Get Started</button>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="justify-center p-5">
                    <h1 className="text-4xl text-slate-900  items-center text-center p-4">Explore Our Email Marketing<br /> Platform Phraims</h1>
                    <p className="text-center p-4">Real-time ranking position of your websites's <br /> keyword across major search engine</p>
                    <div className="flex m-2">
                        <div className="bg-yellow-500 rounded-lg mx-3 p-3">
                            <h3 className="text-slate-900">Automations</h3>
                            <p>Automate your email capaigns to ensure that the content is sent to the right segment.</p>
                        </div>
                        <div className="bg-yellow-500 rounded-lg mx-3 p-3">
                            <h3>Automations</h3>
                            <p>Automate your email capaigns to ensure that the content is sent to the right segment.</p>
                        </div>
                        
                    </div>
                    <button>Book Your Services</button>
                </div>
       </div>
    );
}

export default Hero;