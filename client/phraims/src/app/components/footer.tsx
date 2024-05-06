
const Footer = () => {

    return (
        <div className="bg-yellow-200 flex justify-between mx-auto pt-10">
            <div className="mx-10">
                <h1 className="text-3xl">Phraims</h1>
                <p>Unlock Your Business Potential with <br /> Our Social Media Solutions.</p>
            </div>
            <div>
                <h1 className="text-xl font-bold">Services</h1>
                <ul className="text-slate-800">
                    <li>Accounting Solution</li>
                    <li>Financial Management</li>
                    <li>FAQs</li>
                </ul>
            </div>
            <div>
                <h1 className="text-xl font-bold">Quick Links</h1>
                <ul className="text-slate-800">
                    <li>Blog</li>
                    <li>Site Map</li>
                    <li>Careers</li>
                    </ul>
            </div>
            
            <div className="justify-center items-center">
                <h1 className="text-xl font-bold">Contact</h1>
                <ul className="text-slate-800">
                    <li>ayendisimeon@gmail.com</li>
                    <li>+2349075754477</li>
                </ul>
            </div>

        </div>
    );

}

export default Footer;