import { Movement } from '@/interfaces/movement.interfaces'
import React from 'react'
import { cn } from '@/lib/utils'
import { IoArrowDownOutline, IoArrowUpOutline, IoSwapHorizontalOutline, IoCalendarOutline, IoCubeOutline } from 'react-icons/io5'

interface Props {
    movements: Movement[]
}

const MovementCard = ({ movements }: Props) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getMovementIcon = (type: string) => {
        switch (type) {
            case 'Inbound':
                return <IoArrowDownOutline className="text-green-600 text-xl" />;
            case 'Outbound':
                return <IoArrowUpOutline className="text-red-600 text-xl" />;
            case 'Transfer':
                return <IoSwapHorizontalOutline className="text-blue-600 text-xl" />;
            default:
                return <IoCubeOutline className="text-gray-600 text-xl" />;
        }
    };

    const getMovementColor = (type: string) => {
        switch (type) {
            case 'Inbound':
                return 'bg-green-100';
            case 'Outbound':
                return 'bg-red-100';
            case 'Transfer':
                return 'bg-blue-100';
            default:
                return 'bg-gray-100';
        }
    };

    return (
        <>
            {
                movements.length > 0 ? (
                    movements.map(movement => (
                        <div key={movement.id} className="w-full mx-auto my-4 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3">

                            {/* Header with ID and Product */}
                            <div className="flex flex-col flex-grow">
                                <div className='flex items-center gap-3'>
                                    <div className={cn("p-2 rounded-lg", getMovementColor(movement.type))}>
                                        {getMovementIcon(movement.type)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-800 text-lg font-bold">
                                            {movement.product.name}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            <span className='font-semibold'>ID:</span> {movement.id?.split('-').at(-1) || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Content */}
                            <div className='flex gap-4 justify-between items-center'>
                                <div className="flex flex-col gap-2">
                                    <span className={cn(
                                        "inline-flex items-center gap-x-1 rounded-full px-3 py-1 text-sm font-medium",
                                        movement.type === 'Inbound' ? "bg-green-50 text-green-700" :
                                            movement.type === 'Outbound' ? "bg-red-50 text-red-700" :
                                                "bg-blue-50 text-blue-700"
                                    )}>
                                        {movement.type}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <IoCalendarOutline className="text-gray-400" />
                                        <span>{formatDate(movement.createdAt)}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-2xl font-bold text-gray-800">
                                        {movement.quantity}
                                    </span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Quantity
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="w-full mx-auto my-4 bg-white border border-gray-200 rounded-xl p-8 text-center">
                        <div className="flex flex-col items-center gap-3">
                            <svg className="size-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <span className="text-sm text-gray-500">
                                No movements were found that match your search.
                            </span>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MovementCard 