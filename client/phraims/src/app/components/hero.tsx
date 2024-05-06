import image1 from "../assets/images/image1.jpg";
import Image from "next/image";
import { Roboto } from "next/font/google";
// import { Check } from '@mui/icons-material';
import { AiOutlineUser } from 'react-icons/ai';
// import CheckIcon from '@mui/icons-material/Check';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const Hero = () => {

    return (
        <div className="p-0">
            <div className=" flex justify-center items-center mb-5">
                <div className="">
                <h1 className="text-6xl text-center text-slate-900 font-bold mt-10 pt-5" >Supercharge Your Business<br /> with 
                Email Marketing</h1>
                <h5 className="text-xl text-center text-slate-500 m-3 p-2 animate-fade-in">Engage, Convert and Retain Customers Like Never Before, <br />Our Email Marketing Solution Puts Your Brand In The Spotlight.</h5>
                <div className="flex mx-2 justify-center items-center my-5">
                    <button className="bg-yellow-500 px-6 rounded-full py-3 m-2 text-white">Get Started</button>
                    <button className=" px-6 py-3 rounded-full m-2 border border-yellow-500">Try For Free</button>
                </div>
                <div className="flex justify-center items-center m-4">
                {/* <Check fontSize="large" color="green" /> */}
                    <p className="p-3 text-xl">General Email Marketing</p>
                    {/* <CheckIcon /> */}
                    <p className="p-3 text-xl">B2B Email Marketing</p>
                    <p className="p-3 text-xl">Automated Email Marketing</p>
                </div>
                <div className="flex justify-center items-center m-0 p-0 sm:!flex lg:flex">
                        <div className="bg-yellow-100 m-10 p-2 rounded-lg mx-8"> 
                            <Image src="/images/img.jpg" alt="new" className="w-full rounded-lg" width={100} height={100} />
                                    <span className="p-2 m-2 bg-black text-white rounded-full">01</span>
                                 <h2 className="text-slate-900 text-2xl py-4">Expanding Your Business</h2>
                                <p>Try out Benchmark for free to discover how simple effective email marketing can be.</p>
                        </div>
                        <div className="bg-yellow-100 m-2 p-0 rounded-lg">
                            
                            <Image src="/images/img.jpg" alt="new" className="w-full rounded-lg" width={100} height={100} />
                        
                                    <span className="p-2 m-2 bg-black text-white rounded-full">01</span>
                                 <h2 className="text-slate-900 text-2xl py-4">Expanding Your Business</h2>
                                <p>Try out Benchmark for free to discover how simple effective email marketing can be.</p>
                        </div>
                        <div className="bg-yellow-100 m-2 p-0 rounded-lg">
                            
                            
                        <Image src="/images/img.jpg" alt="new" className="w-full rounded-lg" width={100} height={100} />
                        
                        
                                    <span className="p-2 m-2 bg-black text-white rounded-full">01</span>
                                 <h2 className="text-slate-900 text-2xl py-4">Expanding Your Business</h2>
                                <p>Try out Benchmark for free to discover how simple effective email marketing can be.</p>
                        </div>
                    </div>
                    <div className="bg-black flex text-center justify-center items-center pl-4 pt-10  pb-10 ">
                        <div className="p-6 mx-8">
                            <p className="text-slate-500 text-xl text-yellow-500 p-4 mx-3">95%</p>
                            <p className="text-white ml-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                        <div className="p-6 mx-8">
                            <p className="text-slate-500 text-xl text-yellow-500 p-4 mx-3 ">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                        <div className="p-6 mx-8">
                            <p className="text-slate-500 text-xl text-yellow-500 p-4 ">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                        <div className="p-6 mx-8">
                            <p className="text-slate-500 text-xl p-4 text-yellow-500 ">95%</p>
                            <p className="text-white mx-4">Of members asks on Marketer <br /> Get a Response</p>
                        </div>
                    </div>
                    </div>
                </div>
             
                
                <div className="flex bg-yellow-200 pt-10 pl-10 pb-8">
                    <br />
                    <div>
                        <h1 className="text-6xl pt-10 pl-10">Boost Your Business <br /> With Phraims</h1>
                        <p className=" text-xl pt-10 pl-10">Have you tried ChatGpt or similar tools to write our resume or cover letter but been disappointed by the impersonal respnses?<br />
                            Ever time, Postlander's industry-best personalisation produces conten that is more targeed and superior.
                        </p>
                        <div className="pt-10 pl-10">
                        <button className="rounded-full bg-yellow-500 p-4">Get Started</button>
                        </div>
                        
                    </div>
                    <div>

                    </div>
                </div>

                <div className="justify-center pt-10">
                    <div className="m-8 pt-10">
                    <h1 className="text-6xl text-slate-900  items-center text-center pt-10">Explore Our Email Marketing<br /> Platform Phraims</h1>
                    <p className="text-center text-xl text-slate-800 p-4">Real-time ranking position of your websites's <br /> keyword across major search engine</p>
                    <div className="flex m-2 justify-center items-center ">
                        <div className="bg-yellow-500 rounded-lg mt-10 mx-4 p-3">
                            <div className="flex">
                            <h3 className="text-slate-900 text-xl font-bold">Automations</h3>
                            </div>
                            
                            <p>Automate your email capaigns to ensure that the content is sent to the right segment.</p>
                        </div>
                        <div className="bg-yellow-500 rounded-lg mt-10 mx-4 p-3">
                            <h3 className="text-slate-900 text-xl font-bold">Automations</h3>
                            <p>Automate your email capaigns to ensure that the content is sent to the right segment.</p>
                        </div>
                        
                    </div>
                    <div className="justify-center items-center text-center pt-8">
                    <button className="bg-yellow-500 text-white pt-4 pb-4 px-6 mx-6 rounded-full">Book Your Services</button> 
                    </div>
                    
                    </div>
                    
                </div>
       </div>
    );
}

export default Hero;