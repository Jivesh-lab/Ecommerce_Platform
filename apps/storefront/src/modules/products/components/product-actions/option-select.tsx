import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col w-full mt-4">
      <div
        className="flex flex-col w-full"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "w-full flex items-center justify-between py-3 border-b border-gray-200 text-xs font-semibold tracking-wider uppercase transition-colors text-left",
                {
                  "text-black bg-gray-50": v === current,
                  "text-gray-600 hover:text-black": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              <span>{v}</span>
              {v === current && <span className="text-[10px] text-gray-400">SELECTED</span>}
            </button>
          )
        })}
      </div>
      <button className="text-left text-[11px] font-semibold text-gray-900 underline mt-4 tracking-wide uppercase hover:text-gray-600 transition-colors">
         Measurements
      </button>
    </div>
  )
}

export default OptionSelect
