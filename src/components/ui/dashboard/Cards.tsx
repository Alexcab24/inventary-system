import { IconType } from "react-icons";




export default function Card({
  title,
  value,
  icon: Icon
}: {
  title: string;
  value: number | string;
  icon: IconType;
}) {

  return (
    <div className="flex flex-col w-full bg-white border shadow-sm rounded-xl">
      <div className="p-4 md:p-5 flex gap-x-4">
        <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
          <Icon size={26} />
        </div>

        <div className="grow">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {title}
            </p>

          </div>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              {value}
            </h3>

          </div>
        </div>
      </div>
    </div>
  )

}