import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ResultCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-lg border-[#ddd3c6] bg-[#fffdf8] shadow-[0_2px_8px_rgba(59,46,30,0.06)]">
      <CardHeader className="flex-row items-center justify-between gap-3 px-4 py-3">
        <CardTitle className="text-[0.78rem] font-semibold uppercase tracking-wider text-[#7d756c]">
          {title}
        </CardTitle>
        {action}
      </CardHeader>
      <Separator className="bg-[#ebe2d6]" />
      <CardContent className="px-4 py-4">{children}</CardContent>
    </Card>
  );
}
