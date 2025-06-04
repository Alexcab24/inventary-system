import { getCompanytById } from '@/actions/company/get-company-by-id';
import { Form } from '@/components/ui/company/Form';
import { headers } from 'next/headers';


export default async function CompanyPage() {
    const headerList = await headers();
    const subdomain = headerList.get('host') || '';
    const workspace = subdomain.split('.')[0];


    const company = await getCompanytById(workspace);

    if (!company) return null;



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
                            <p className="mt-1 text-sm text-gray-600">Manage your company profile and settings</p>
                        </div>
                    </div>
                </div>

                <Form
                    company={company}
                />
            </div>
        </div>
    );
}