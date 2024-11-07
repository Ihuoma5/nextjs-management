import SiteStatus from '@/app/ui/sites/status'; 
import { formatDateToLocal } from '@/app/lib/utils'; 
import { fetchFilteredSites } from '@/app/lib/data';

export default async function SitesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sites = await fetchFilteredSites(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sites?.map((site) => (
              <div
                key={site.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{site.site_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{site.trueprep}</p>
                  </div>
                  <SiteStatus status={site.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(site.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Site Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Trueprep
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Truelab
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sites?.map((site) => (
                <tr
                  key={site.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{site.site_name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {site.trueprep} {/* Assuming trueprep is a value in your site object */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {site.truelab} {/* Assuming truelab is a value in your site object */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(site.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <SiteStatus status={site.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
