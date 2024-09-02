'use client';

import { usePathname } from "next/navigation";

export const ViewRoute = () => {
    const pathName = usePathname();
    const pathSegments = pathName.split('/').filter(Boolean);

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const SvgSeparator = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
    );

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex items-center">
                <li>
                    <a href="/">Inicio</a>
                </li>
                {pathSegments.map((segment, index) => {
                    const isLast = index === pathSegments.length - 1;
                    const capitalizedSegment = capitalize(decodeURIComponent(segment));

                    return (
                        <li key={index} className="flex items-center">
                            <SvgSeparator />
                            {!isLast ? (
                                <a href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                                    {capitalizedSegment}
                                </a>
                            ) : (
                                <span>{capitalizedSegment}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
