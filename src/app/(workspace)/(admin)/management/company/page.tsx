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
        <div className="">



            <Form
                company={company}
            />

        </div>
    );
}