'use client';

import { useActionState } from 'react';
import { createInvoice, State } from '@/app/lib/actions';
import { Site } from '@/app/lib/definitions'; // Adjust path if needed
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function Form({ sites }: { sites: Site[] }) {
  // Define the initial state and setup form action
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  // Return the JSX form
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        {/* Site Name */}
        <div className="mb-4">
          <label htmlFor="site_name" className="mb-2 block text-sm font-medium">
            Site Name
          </label>
          <input
            id="site_name"
            name="site_name"
            type="text"
            placeholder="Enter site name"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          {state.errors?.site_name &&
            state.errors.site_name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Trueprep */}
        <div className="mb-4">
          <label htmlFor="trueprep" className="mb-2 block text-sm font-medium">
            Trueprep
          </label>
          <input
            id="trueprep"
            name="trueprep"
            type="text"
            placeholder="Enter Trueprep details"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          {state.errors?.trueprep &&
            state.errors.trueprep.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Truelab */}
        <div className="mb-4">
          <label htmlFor="truelab" className="mb-2 block text-sm font-medium">
            Truelab
          </label>
          <input
            id="truelab"
            name="truelab"
            type="text"
            placeholder="Enter Truelab details"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          {state.errors?.truelab &&
            state.errors.truelab.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>

        {/* Date */}
        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
          {state.errors?.date &&
            state.errors.date.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/sites"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Site Record</Button>
      </div>
    </form>
  );
}
