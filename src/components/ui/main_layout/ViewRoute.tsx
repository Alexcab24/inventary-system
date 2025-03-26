'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export const ViewRoute = () => {
    const pathName = usePathname() || '';
    const pathSegments = pathName.split('/').filter(Boolean);

    // Regular expression to detect UUIDs
    const isUUID = (str: string) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

    // Filter out UUID segments
    const filteredSegments = pathSegments.filter(segment => !isUUID(segment));

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const SvgSeparator = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="mx-2 text-gray-400"
        >
            <path fill="currentColor" d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
        </svg>
    );

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm md:text-base text-gray-600 dark:text-gray-300 px-4 py-2">
                <li>
                    <Link href="/" className="hover:text-gray-800 dark:hover:text-white transition-colors">
                        Home
                    </Link>
                </li>
                {filteredSegments.map((segment, index) => {
                    const isLast = index === filteredSegments.length - 1;
                    const capitalizedSegment = capitalize(decodeURIComponent(segment));

                    return (
                        <li key={index} className="flex items-center">
                            <SvgSeparator />
                            {!isLast ? (
                                <Link
                                    href={`/${filteredSegments.slice(0, index + 1).join('/')}`}
                                    className="hover:text-gray-800 dark:hover:text-white transition-colors"
                                >
                                    {capitalizedSegment}
                                </Link>
                            ) : (
                                <span className="text-gray-800 dark:text-white font-medium" aria-current="page">
                                    {capitalizedSegment}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
