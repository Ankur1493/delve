import { Card, CardContent, CardTitle } from "../ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type FeatureWrapperProps = {
  headerLabel: string;
  buttonHref: string;
};

export const FeatureWrapper: React.FC<FeatureWrapperProps> = ({
  headerLabel,
  buttonHref,
}) => {
  return (
    <Link href={buttonHref} className="w-full">
      <Card className="flex flex-row bg-white/10 border-none justify-around py-6 items-center text-white">
        <CardTitle className="text-4xl">{headerLabel}</CardTitle>
        <CardContent className="flex justify-center items-center p-0 m-0">
          <button className="flex justify-center items-center p-0 m-0">
            <ArrowRight />
          </button>
        </CardContent>
      </Card>
    </Link>
  );
};
