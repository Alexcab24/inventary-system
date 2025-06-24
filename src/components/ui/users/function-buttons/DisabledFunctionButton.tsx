'use client';

import { toggleUserAvailability } from "@/actions/users/toggleUserAvailability";
import { useState } from "react";
import { MdBlock, MdCheckCircle } from "react-icons/md";
import { errorNotification, successNotification } from "../../notification/notifications";


export const DisabledFunctionButton = ({ id, enabled }: { id: string, enabled: boolean }) => {

    const [isEnabled, setIsEnabled] = useState(enabled);


    const onClick = async () => {
        setIsEnabled((prev) => !prev);
        const resp = await toggleUserAvailability(id, enabled);

        if (resp.ok) {
            successNotification(resp.message);
            return;
        } else {
            errorNotification(resp.message);
            return;
        }
    }



    return (
        <button
            onClick={onClick}
            className={`
            inline-flex items-center gap-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isEnabled
                    ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 focus:ring-red-500'
                    : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 focus:ring-green-500'
                }
          `}
        >
            {isEnabled ? (
                <>
                    <MdBlock size={18} />
                    <span>Disable</span>
                </>
            ) : (
                <>
                    <MdCheckCircle size={18} />
                    <span>Enable</span>
                </>
            )}
        </button>
    )
}
