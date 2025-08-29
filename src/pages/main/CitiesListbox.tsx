import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

export type City = { id: number; name: string };

type Props = {
    label?: string
    cities: City[]
    value: City | null
    onChange: (city: City) => void
}

export default function CitiesListbox({ label = "City", cities, value, onChange }: Props) {
    return (
        <div className="w-full max-w-xs">
            {label && (
                <label className="block text-sm font-medium text-gray-200 mb-2">
                    {label}
                </label>
            )}
            <Listbox value={value ?? undefined} onChange={onChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-xl bg-neutral-800 py-3 pl-4 pr-10 text-left text-white shadow-md ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <span className="block truncate">{value?.name ?? "Select a city"}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">▾</span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-neutral-800 py-2 text-base shadow-lg ring-1 ring-white/10 focus:outline-none sm:text-sm">
                            {cities.map((city) => (
                                <Listbox.Option
                                    key={city.id}
                                    value={city}
                                    className={({ active, selected }) =>
                                        `relative cursor-default select-none px-4 py-2 ${selected ? "bg-yellow-400/20 text-yellow-300" : active ? "bg-neutral-700 text-white" : "text-gray-200"}`
                                    }
                                >
                                    <span className="block truncate">{city.name}</span>
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
} 