'use client';

import { Site } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSite } from '@/app/lib/actions';

export default function EditSiteForm({
  site,
  sites,
}: {
  site: Site;
  sites: Site[];
}) {
  const updateSiteWithId = updateSite.bind(null, site.id);
  return (
    <form action={updateSiteWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Site Name */}
        <div className="mb-4">
          <label htmlFor="site_name" className="mb-2 block text-sm font-medium">
            Site Name
          </label>
          <div className="relative">
            <select
              id="site_name"
              name="siteId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={site.site_name}
            >
              <option value="" disabled>
                Select a site
              </option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.site_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Trueprep */}
        <div className="mb-4">
          <label htmlFor="trueprep" className="mb-2 block text-sm font-medium">
            Trueprep ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="trueprep"
                name="trueprep"
                type="text"
                defaultValue={site.trueprep}
                placeholder="Enter Trueprep ID"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Truelab */}
        <div className="mb-4">
          <label htmlFor="truelab" className="mb-2 block text-sm font-medium">
            Truelab ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="truelab"
                name="truelab"
                type="text"
                defaultValue={site.truelab}
                placeholder="Enter Truelab ID"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Site Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the site status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  defaultChecked={site.status === 'active'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  value="inactive"
                  defaultChecked={site.status === 'inactive'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="inactive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Inactive <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/sites"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Site</Button>
      </div>
    </form>
  );
}
