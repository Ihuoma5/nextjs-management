import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-24 w-24 rotate-[15deg]" />
      {/* <Image
        src="/site-logo"
        width={12}
        height={12}
        alt="Logo"
      /> */}
      <p className="text-[44px]">Records</p>
    </div>
  );
}
