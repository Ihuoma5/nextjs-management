import Form from '@/app/ui/sites/create-form';
import Breadcrumbs from '@/app/ui/sites/breadcrumbs';
import { fetchSites } from '@/app/lib/data'; // Adjust the function as needed to fetch sites

export default async function Page() {
  const sites = await fetchSites(); // Fetch site data instead of customers

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sites', href: '/dashboard/sites' }, // Adjust breadcrumb path for sites
          {
            label: 'Create Site',
            href: '/dashboard/sites/create',
            active: true,
          },
        ]}
      />
      <Form sites={sites} /> {/* Pass the fetched sites data to the form */}
    </main>
  );
}
