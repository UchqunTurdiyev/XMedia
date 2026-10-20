import { getLead } from "@/lib/store";
import { isValidSaleToken } from "@/lib/saleLink";
import { formatPhone } from "@/lib/hash";
import { Logo } from "@/components/ui";
import SaleForm from "./SaleForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sotuv — summa kiritish", robots: { index: false, follow: false } };

export default async function SalePage({ params, searchParams }) {
  const { id } = await params;
  const { t } = await searchParams;

  const valid = isValidSaleToken(id, t);
  const lead = valid ? await getLead(id) : null;

  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 py-16">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="w-full max-w-md rounded-[2rem] border border-line bg-ink-2 p-7 sm:p-10">
        <Logo />
        {!lead ? (
          <p className="mt-8 text-paper/80">{valid ? "Lid topilmadi (muddati o'tgan bo'lishi mumkin)." : "Havola yaroqsiz."}</p>
        ) : (
          <>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-neon">💰 Sotuv bo'ldi · #L-{lead.id}</p>
            <h1 className="mt-3 text-2xl font-extrabold">{lead.name}</h1>
            <p className="mt-1 text-sm text-mute">
              {formatPhone(lead.phone)}
              {lead.service ? ` · ${lead.service}` : ""}
            </p>
            <SaleForm
              id={lead.id}
              t={t}
              bad={lead.status === "bad"}
              initialSales={(lead.sales || []).map((s) => ({ uzs: s.uzs, at: s.at }))}
            />
          </>
        )}
      </div>
    </main>
  );
}
