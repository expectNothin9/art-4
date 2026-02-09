import { WindIcon } from "@/components/ui/wind";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          ART 4
          <WindIcon />
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("internationalization")}
        </p>
      </div>
    </main>
  );
}
