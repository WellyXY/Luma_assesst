import { notFound } from "next/navigation";
import { CanvasTopBar } from "@/app/components/canvas/CanvasTopBar";
import { CanvasBoard } from "@/app/components/canvas/CanvasBoard";
import { getCanvasSpec } from "@/data/canvasSpecs";

export default async function CanvasAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getCanvasSpec(id);
  if (!result) notFound();
  const { card, spec } = result;

  return (
    <div className="flex h-screen flex-col bg-bg">
      <CanvasTopBar title={spec.displayTitle} />
      <CanvasBoard card={card} spec={spec} />
    </div>
  );
}
