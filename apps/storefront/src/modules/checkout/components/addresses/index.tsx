"use client"
import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import { Heading, Text } from "@modules/common/components/ui"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="mb-8 flex flex-row items-center justify-between border-b border-neutral-200 pb-4">
        <Heading
          level="h2"
          className="flex flex-row items-baseline gap-x-2 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-950"
        >
          Delivery Details
          {!isOpen && <CheckCircleSolid />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-950"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={formAction}>
          <div className="pb-10">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="border-b border-neutral-200 pb-4 pt-8 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-950"
                >
                  Billing Address
                </Heading>

                <div className="pt-6">
                  <BillingAddress cart={cart} />
                </div>
              </div>
            )}
            <SubmitButton
              className="mt-8 h-14 w-full rounded-none bg-black px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-neutral-900 small:w-auto small:min-w-[320px]"
              data-testid="submit-address-button"
            >
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex w-full flex-col small:w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Shipping Address
                    </Text>
                    <Text className="text-sm text-neutral-700">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="text-sm text-neutral-700">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="text-sm text-neutral-700">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="text-sm text-neutral-700">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex w-full flex-col small:w-1/3"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Contact
                    </Text>
                    <Text className="text-sm text-neutral-700">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="text-sm text-neutral-700">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex w-full flex-col small:w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <Text className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      Billing Address
                    </Text>

                    {sameAsBilling ? (
                      <Text className="text-sm text-neutral-700">
                        Billing and delivery address are the same.
                      </Text>
                    ) : (
                      <>
                        <Text className="text-sm text-neutral-700">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="text-sm text-neutral-700">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="text-sm text-neutral-700">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="text-sm text-neutral-700">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-10 border-neutral-200" />
    </div>
  )
}

export default Addresses
