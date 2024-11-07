import Form from '@/app/ui/sites/edit-form'; // Update to point to the correct form component
import Breadcrumbs from '@/app/ui/sites/breadcrumbs'; // Update to point to the correct breadcrumbs component
import { fetchSiteById } from '@/app/lib/data'; // You may need to adjust the function to fetch site data
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const site = await fetchSiteById(id); // Fetch the site by ID

  if (!site) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sites', href: '/dashboard/sites' }, // Adjust breadcrumb path for sites
          {
            label: 'Edit Site',
            href: `/dashboard/sites/${id}/edit`, // Update URL for editing site
            active: true,
          },
        ]}
      />
      <Form site={site} /> 
    </main>
  );
}
