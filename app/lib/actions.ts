'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


const UpdateInvoice = FormSchema.omit({ id: true, date: true }); 
 
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

// Schema for validating Site data
const SiteFormSchema = z.object({
  id: z.string(),
  trueprep: z.string(),
  truelab: z.string(),
  site_name: z.string(),
  date: z.string(),
});

const CreateSite = SiteFormSchema.omit({ id: true });

export type SiteState = {
  errors?: {
    trueprep?: string[];
    truelab?: string[];
    site_name?: string[];
    date?: string[];
  };
  message?: string | null;
};

// Create a new site
export async function createSite(prevState: SiteState, formData: FormData) {
  const validatedFields = CreateSite.safeParse({
    trueprep: formData.get('trueprep'),
    truelab: formData.get('truelab'),
    site_name: formData.get('site_name'),
    date: formData.get('date'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Site.',
    };
  }

  const { trueprep, truelab, site_name, date } = validatedFields.data;

  try {
    await sql`
      INSERT INTO sites (trueprep, truelab, site_name, date)
      VALUES (${trueprep}, ${truelab}, ${site_name}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Site.',
    };
  }

  revalidatePath('/dashboard/sites');
  redirect('/dashboard/sites');
}

// Update an existing site
const UpdateSite = SiteFormSchema.omit({ id: true });

export async function updateSite(id: string, formData: FormData) {
  const { trueprep, truelab, site_name, date } = UpdateSite.parse({
    trueprep: formData.get('trueprep'),
    truelab: formData.get('truelab'),
    site_name: formData.get('site_name'),
    date: formData.get('date'),
  });

  try {
    await sql`
      UPDATE sites
      SET trueprep = ${trueprep}, truelab = ${truelab}, site_name = ${site_name}, date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Site.' };
  }

  revalidatePath('/dashboard/sites');
  redirect('/dashboard/sites');
}

// Delete a site
export async function deleteSite(id: string) {
  try {
    await sql`DELETE FROM sites WHERE id = ${id}`;
    revalidatePath('/dashboard/sites');
    return { message: 'Deleted Site.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Site.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}