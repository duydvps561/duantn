'use client'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Access({ children }) {
    const userRole = useSelector((state) => state.auth.user?.role);
    const router = useRouter();
    const pathname = usePathname(); 

    useEffect(() => {
        console.log("Current URL path:", pathname);  

        if (userRole === 'Admin' && pathname === '/') {
            router.replace('/admin/thongke');
            return;
        }
        if (userRole === 'user' && pathname.startsWith('/admin/')) {
            router.replace('/404');
        }        
    }, [pathname, userRole, router]);

    return <>{children}</>;  
}
