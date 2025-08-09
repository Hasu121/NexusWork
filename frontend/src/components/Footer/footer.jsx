import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-200 py-4 flex justify-center">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center py-4">
                <div className="flex gap-2 items-center cursor-pointer">
                    <h3 className="text-blue-800 font-bold text-xl">Nexus</h3>
                    <img
                        src="https://static01.nyt.com/images/2021/09/23/opinion/23Malesic-2/23Malesic-2-superJumbo.jpg" alt="Nexus Logo" className="w-16 h-8 object-cover rounded" />
                </div>

                <div className="text-sm">© 2025 Nexus. All rights reserved.</div>
            </div>
        </footer>
    );
};

export default Footer;
