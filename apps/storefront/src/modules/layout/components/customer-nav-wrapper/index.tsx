import { retrieveCustomer } from "@lib/data/customer"
import AccountDropdown from "@modules/layout/components/account-dropdown"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function CustomerNavWrapper() {
  console.time("CustomerNavWrapper: retrieveCustomer")
  const customer = await retrieveCustomer()
  console.timeEnd("CustomerNavWrapper: retrieveCustomer")

  if (customer) {
    return <AccountDropdown customer={customer} />
  }

  return (
    <LocalizedClientLink
      href="/account"
      className="hover:text-[#555555] transition-colors duration-200"
      data-testid="nav-account-link"
    >
      Log In
    </LocalizedClientLink>
  )
}
