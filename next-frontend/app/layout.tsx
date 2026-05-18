//root/app/layout.tsx

/**
 *
 */

import "./globals.css";
import type {Metadata} from "next";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export const metadata: Metadata = {
    title: "Bodensee Sportplaetze",
    description: "Finde und bewerte deinen Sportplatz. Konnekte dich mit Anderen.",
};

export default function RootLayout( {children}: {children: React.ReactNode;} )
{
    return (
        <html lang="de">
            <body>
                <Navbar />
                    {children}
                <Footer />
            </body>
        </html>
    );
}
