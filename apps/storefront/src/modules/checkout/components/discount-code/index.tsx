"use client"

import { Badge, Heading, Input, Label, Text } from "@modules/common/components/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e))
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div className="w-full bg-white flex flex-col font-sans">
      <div className="text-xs">
        <form action={(a) => addPromotionCode(a)} className="w-full mb-4">
          <div className="flex my-2 items-center w-full">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-xs uppercase tracking-wider text-neutral-800 hover:text-black transition-colors focus:outline-none flex items-center justify-between w-full py-2 border-b border-neutral-200"
              data-testid="add-discount-button"
            >
              <span>Do you have a promotional code?</span>
              <span className="text-[10px]">{isOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          {isOpen && (
            <div className="mt-3 flex flex-col gap-y-2">
              <div className="flex w-full gap-x-2">
                <input
                  className="flex-1 bg-white border border-neutral-300 px-3 py-2 text-xs focus:outline-none focus:border-black tracking-wide"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Code"
                  data-testid="discount-input"
                />
                <button
                  type="submit"
                  className="border border-black bg-white hover:bg-black hover:text-white text-black text-[10px] font-semibold tracking-widest uppercase px-4 py-2 transition-all duration-300 shrink-0"
                  data-testid="discount-apply-button"
                >
                  Apply
                </button>
              </div>

              <ErrorMessage
                error={errorMessage}
                data-testid="discount-error-message"
              />
            </div>
          )}
        </form>


        {promotions.length > 0 && (
          <div className="w-full flex items-center">
            <div className="flex flex-col w-full">
              <Heading className="txt-medium mb-2">
                Promotion(s) applied:
              </Heading>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="flex items-center justify-between w-full max-w-full mb-2"
                    data-testid="discount-row"
                  >
                    <Text className="flex gap-x-1 items-baseline txt-small-plus w-4/5 pr-1">
                      <span className="truncate" data-testid="discount-code">
                        <Badge
                          color={promotion.is_automatic ? "green" : "grey"}
                        >
                          {promotion.code}
                        </Badge>{" "}
                        (
                        {promotion.application_method?.value !== undefined &&
                          promotion.application_method.currency_code !==
                            undefined && (
                            <>
                              {promotion.application_method.type ===
                              "percentage"
                                ? `${promotion.application_method.value}%`
                                : convertToLocale({
                                    amount: +promotion.application_method.value,
                                    currency_code:
                                      promotion.application_method
                                        .currency_code,
                                  })}
                            </>
                          )}
                        )
                        {/* {promotion.is_automatic && (
                          <Tooltip content="This promotion is automatically applied">
                            <InformationCircleSolid className="inline text-zinc-400" />
                          </Tooltip>
                        )} */}
                      </span>
                    </Text>
                    {!promotion.is_automatic && (
                      <button
                        className="flex items-center"
                        onClick={() => {
                          if (!promotion.code) {
                            return
                          }

                          removePromotionCode(promotion.code)
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={14} />
                        <span className="sr-only">
                          Remove discount code from order
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
