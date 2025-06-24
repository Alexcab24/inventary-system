import { GetProfileById } from "@/actions/profile/get-profile-by-id";
import { auth } from "@/auth.config";
import FormEdit from "@/components/ui/profile/FormEdit";
import { IoInformationCircleOutline } from "react-icons/io5";


export default async function EditProfilePage() {

    const session = await auth();
    const userId = session?.user.id
    if (!userId) return
    const userProfile = await GetProfileById(userId);

    if (!userProfile) {
        return
    }

    return (
        <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm">
                        <IoInformationCircleOutline className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit profile</h1>
                        <p className="text-gray-600 mt-1">Update your personal information</p>
                    </div>
                </div>
            </div>

            <FormEdit
                userProfile={userProfile}
            />

        </div>
    );
}