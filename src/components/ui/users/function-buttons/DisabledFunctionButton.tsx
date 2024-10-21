'use client';

import { toggleUserAvailability } from "@/actions/users/toggleUserAvailability";
import { useState } from "react";
import { FiLock, FiUnlock } from "react-icons/fi"
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
        <button onClick={onClick} className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline focus:outline-none focus:underline border border-gray-200 p-2 rounded-md hover:bg-gray-50 text-gray-800 ">
            {isEnabled ? (
                <>
                    <FiLock size={22} />
                </>
            ) : (
                <>
                    <FiUnlock size={22} />
                </>
            )}
        </button>
    )
}
