// root/components/navbar.tsx

// A component to render a navigation bar, has a toggle for mobile view and nav links.
// https://medium.com/@ryaddev/build-responsive-navbar-with-tailwind-css-and-react-icons-3b13a272dec4
'use client'

import Image from 'next/image'
import { Menu } from 'lucide-react';
import {useState} from 'react'

/**
 * @returns
 * @docs
 */
export default function Navbar() {
    return (
        <nav className="relative bg-gray-100">
            <div className="mx-auto max-w-7xl px-2 lg:px-8">
                <div className="relative flex h-40 items-center justify-between">
                    <Image src="/logo-desktop.png"
                           width={300}
                           height={300}
                           alt="brand logo"
                    />
                    <Menu />
                </div>
            </div>
        </nav>
    )
}