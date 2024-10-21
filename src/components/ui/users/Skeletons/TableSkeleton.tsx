const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent rounded-xl';

export const TableSkeleton = () => {
    return (
        <table className={`${shimmer} min-w-full divide-y divide-gray-200`}>
            <thead className="bg-gray-50 ">
                <tr>
                    <th className="ps-6 py-3 text-start">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </th>
                    <th className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </th>
                    <th className="px-6 py-3 text-start">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </th>
                    <th className="px-6 py-3 text-start">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </th>
                    <th className="px-6 py-3 text-start">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </th>
                    <th className="px-6 py-3 text-start">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {/* <!-- Skeleton rows --> */}
                <tr>
                    <td className="ps-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="grow">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex gap-x-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="ps-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="grow">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex gap-x-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="ps-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="grow">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex gap-x-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="ps-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="grow">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex gap-x-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="ps-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="grow">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex gap-x-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="ps-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                        <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="grow">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="px-6 py-3">
                        <div className="flex gap-x-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                    </td>
                </tr>
                {/* <!-- Repeat rows as necessary --> */}
            </tbody>
        </table>

    )
}
