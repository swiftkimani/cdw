import { MultiStepFormSchema } from "@/app/schemas/form.schema";
import { SelectDate } from "@/components/reserve/select-date";
import { SubmitDetails } from "@/components/reserve/submit-details";
import { Welcome } from "@/components/reserve/welcome";
import { MultiStepFormEnum, type PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const MAP_STEP_TO_COMPONENT = {
  [MultiStepFormEnum.WELCOME]: Welcome,
  [MultiStepFormEnum.SELECT_DATE]: SelectDate,
  [MultiStepFormEnum.SUBMIT_DETAILS]: SubmitDetails,
};

export default async function ReservePage(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug = params?.slug;
  const step = searchParams?.step;

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug,
    step: Number(step),
  });

  if (!success) {
    console.log({ error });
    notFound();
  }

  const classified = await prisma.classified.findUnique({
    where: { slug: data.slug },
    include: { make: true },
  });

  if (!classified) notFound();

  const Component = MAP_STEP_TO_COMPONENT[data.step as keyof typeof MAP_STEP_TO_COMPONENT];

  return (
    <Component
      searchParams={searchParams}
      params={params}
      classified={classified}
    />
  );
}
