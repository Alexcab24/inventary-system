import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

export default function Card({
  title,
  value,
  icon: Icon,
  className
}: {
  title: string;
  value: number | string;
  icon: IconType;
  className?: string;
}) {
  return (
    <div className={cn(
      "group relative flex flex-col w-full bg-white border shadow-sm rounded-xl transition-all duration-300 hover:shadow-lg overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-4 md:p-5 flex gap-x-4">
        <div className="shrink-0 flex justify-center items-center size-[46px] bg-gradient-to-br from-gray-50 to-white rounded-lg ring-1 ring-gray-100">
          <Icon className="text-gray-600" size={26} />
        </div>

        <div className="grow">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">
              {title}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {value}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}